import winston from "winston";
const { combine, timestamp, json, errors } = winston.format;

const logLevel = process.env.LOGGING_LEVEL ?? "info";

const logger = winston.createLogger({
    level: logLevel,
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
    ),
    transports: [
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
    ]
});

export default logger;