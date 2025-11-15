"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const expressValidatorMiddleware_1 = __importDefault(require("../../middleware/expressValidatorMiddleware"));
const http_errors_1 = __importDefault(require("http-errors"));
const generateToken_1 = require("../../utils/core/generateToken");
const reqValidator = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password required'),
];
const reqHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const [user] = yield db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        if (!user)
            throw new http_errors_1.default.Unauthorized('Invalid credentials');
        const valid = yield bcrypt_1.default.compare(password, user.password);
        if (!valid)
            throw new http_errors_1.default.Unauthorized('Invalid credentials');
        const accessToken = (0, generateToken_1.generateAccessToken)(user.id, user.role || 'user');
        const { token: refreshToken, jti, expiresAt, maxAge } = (0, generateToken_1.generateRefreshToken)(user.id);
        const hashedToken = yield bcrypt_1.default.hash(refreshToken, 10);
        yield db_1.db.insert(schema_1.refreshTokens).values({
            userId: user.id,
            token: hashedToken,
            jti,
            expiresAt,
        });
        const resultResponse = {
            success: true,
            message: `Welcome ${user.name}!`,
            data: { accessToken }
        };
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge,
        });
        res.status(200).json(resultResponse);
    }
    catch (err) {
        next(err);
    }
});
exports.loginController = [
    reqValidator,
    expressValidatorMiddleware_1.default,
    reqHandler
];
