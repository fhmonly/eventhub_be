import { RequestHandler } from 'express';
import { db } from '../../db';
import { refreshTokens, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt'
import { body } from 'express-validator';
import expressValidatorMiddleware from '../../middleware/expressValidatorMiddleware';
import createHttpError from 'http-errors';
import { generateAccessToken, generateRefreshToken } from '../../utils/core/generateToken';
import { APIResponse } from '../../types/response/base';

const reqValidator = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
]

const reqHandler: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) throw new createHttpError.Unauthorized('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new createHttpError.Unauthorized('Invalid credentials');

        const accessToken = generateAccessToken(user.id, user.role || 'user');
        const { token: refreshToken, jti, expiresAt, maxAge } = generateRefreshToken(user.id);
        const hashedToken = await bcrypt.hash(refreshToken, 10);

        await db.insert(refreshTokens).values({
            userId: user.id,
            token: hashedToken,
            jti,
            expiresAt,
        });

        const resultResponse: APIResponse = {
            success: true,
            message: `Welcome ${user.name}!`,
            data: { accessToken, role: user.role }
        }
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge,
        });
        res.status(200).json(resultResponse);
    } catch (err) {
        next(err);
    }
};

export const loginController = [
    reqValidator,
    expressValidatorMiddleware,
    reqHandler
]