"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static sendSuccess(res, message, data = null, statusCode = 200) {
        return res.status(statusCode).json({
            status: true,
            message,
            data,
        });
    }
    static sendError(res, message, statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            status: false,
            message,
            errors,
        });
    }
}
exports.default = ResponseHandler;
