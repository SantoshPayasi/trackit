"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
// Define log format
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
}));
// Define transports
const transports = [
    // Console logging
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), logFormat),
    }),
    // Daily rotated file logging for production
    new winston_daily_rotate_file_1.default({
        level: 'info',
        filename: path_1.default.join(__dirname, '../../logs/app-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        format: logFormat,
    }),
    // Separate error logs
    new winston_daily_rotate_file_1.default({
        level: 'error',
        filename: path_1.default.join(__dirname, '../../logs/error-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxSize: '10m',
        maxFiles: '30d',
        format: logFormat,
    }),
];
const logger = winston_1.default.createLogger({
    level: 'info', // Default level (change to "debug" in dev)
    transports,
    exitOnError: false, // Prevent app from crashing on logging error
});
exports.default = logger;
