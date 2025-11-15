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
exports.refreshTokenController = void 0;
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const generateToken_1 = require("../../utils/core/generateToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const reqHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!refreshToken)
            throw new http_errors_1.default.Unauthorized('Refresh token missing');
        const payload = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        const [storedToken] = yield db_1.db.select().from(schema_1.refreshTokens).where((0, drizzle_orm_1.eq)(schema_1.refreshTokens.jti, payload.jti));
        if (!storedToken)
            throw new http_errors_1.default.Unauthorized('Invalid or revoked refresh token');
        const valid = yield bcrypt_1.default.compare(refreshToken, storedToken.token);
        if (!valid)
            throw new http_errors_1.default.Unauthorized('Invalid or revoked refresh token');
        const [user] = yield db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, storedToken.userId));
        if (!user)
            throw new http_errors_1.default.Unauthorized('User not found');
        const accessToken = (0, generateToken_1.generateAccessToken)(user.id, user.role || 'user');
        const resultResponse = {
            success: true,
            message: `Access Token refreshed.`,
            data: { accessToken }
        };
        res.json(resultResponse);
    }
    catch (err) {
        res.clearCookie('refreshToken');
        next(err);
    }
});
exports.refreshTokenController = [
    reqHandler
];
