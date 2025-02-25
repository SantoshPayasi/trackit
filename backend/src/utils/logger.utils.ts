import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  }),
);

// Define transports
const transports = [
  // Console logging
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormat),
  }),

  // Daily rotated file logging for production
  new DailyRotateFile({
    level: 'info',
    filename: path.join(__dirname, '../../logs/app-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: logFormat,
  }),

  // Separate error logs
  new DailyRotateFile({
    level: 'error',
    filename: path.join(__dirname, '../../logs/error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    maxFiles: '30d',
    format: logFormat,
  }),
];

const logger = winston.createLogger({
  level: 'info', // Default level (change to "debug" in dev)
  transports,
  exitOnError: false, // Prevent app from crashing on logging error
});

export default logger;
