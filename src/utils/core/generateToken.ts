import jwt from 'jsonwebtoken';
import { users } from '../../db/schema';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = 60 * 60 * 24 * 30; // 30 hari

export const generateAccessToken = (userId: number, role: typeof users.role.enumValues[number]) =>
    jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });


export const generateRefreshToken = (userId: number) => {
    const jti = crypto.randomUUID();
    const maxAge = REFRESH_EXPIRES_IN * 1000
    const expiresAt = new Date(Date.now() + maxAge)
    const token = jwt.sign({ userId, jti }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
    return { token, jti, expiresAt, maxAge };
};
