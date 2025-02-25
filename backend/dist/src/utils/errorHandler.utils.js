"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ error: err.message });
};
exports.errorHandler = errorHandler;
