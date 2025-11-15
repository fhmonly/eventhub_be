"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorInstanceOfHttpError = isErrorInstanceOfHttpError;
function isErrorInstanceOfHttpError(error) {
    return error instanceof Error && 'status' in error;
}
