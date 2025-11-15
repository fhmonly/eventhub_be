"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdminMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const authAdminMiddleware = (req, res, next) => {
    var _a;
    try {
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin') {
            next();
        }
        throw http_errors_1.default.Unauthorized('User not authenticated');
    }
    catch (error) {
        next(error);
    }
};
exports.authAdminMiddleware = authAdminMiddleware;
