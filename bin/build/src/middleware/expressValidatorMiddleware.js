"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("http-errors"));
const expressValidatorMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const httpError = http_errors_1.default.BadRequest();
        httpError.validationErrors = errors.array();
        return next(httpError);
    }
    next();
};
exports.default = expressValidatorMiddleware;
