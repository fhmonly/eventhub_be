"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const httpError_1 = require("../utils/libSupport/httpError");
const http_errors_1 = __importDefault(require("http-errors"));
const exceptionMiddleware = (err, req, res, _next) => {
    var _a;
    res.status(err.status || 500);
    const httpErrorMsg = err.message;
    const httpError = (0, httpError_1.isErrorInstanceOfHttpError)(err) ? err : http_errors_1.default.InternalServerError(httpErrorMsg);
    const httpErrorBody = httpError.BadRequest ? (err === null || err === void 0 ? void 0 : err.validationErrors) || (err === null || err === void 0 ? void 0 : err.cause) : httpError;
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }
    if (req.xhr ||
        req.headers["content-type"] === "application/json" ||
        ((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes("application/json"))) {
        const errorResponse = {
            success: false,
            message: httpError.message,
            error: httpErrorBody
        };
        res.json(errorResponse);
        return;
    }
    res.locals.message = `${err.message}`;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
    res.render('error');
};
exports.exceptionMiddleware = exceptionMiddleware;
