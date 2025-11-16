import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const authAdminMiddleware: RequestHandler = (req, res, next) => {
    try {
        if (req.user?.role === 'admin') {
            return next()
        }
        throw createHttpError.Unauthorized('User not authenticated')
    } catch (error) {
        next(error)
    }
};
