"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = 60 * 60 * 24 * 30; // 30 hari
const generateAccessToken = (userId, role) => jsonwebtoken_1.default.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId) => {
    const jti = crypto.randomUUID();
    const maxAge = REFRESH_EXPIRES_IN * 1000;
    const expiresAt = new Date(Date.now() + maxAge);
    const token = jsonwebtoken_1.default.sign({ userId, jti }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { token, jti, expiresAt, maxAge };
};
exports.generateRefreshToken = generateRefreshToken;
