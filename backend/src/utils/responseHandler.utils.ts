
import { Response } from "express";

class ResponseHandler {
    static sendSuccess(res: Response, message: string, data: any = null, statusCode: number = 200) {
        return res.status(statusCode).json({
            status: true,
            message,
            data,
        });
    }

    static sendError(res: Response, message: string, statusCode: number = 400, errors: any = null) {
        return res.status(statusCode).json({
            status: false,
            message,
            errors,
        });
    }
}

export default ResponseHandler;
