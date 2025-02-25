import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ error: err.message });
};
