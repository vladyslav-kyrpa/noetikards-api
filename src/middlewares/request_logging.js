import log from "../utils/logger.js"

const requestLogging = (req, res, next) => {
    log.info(`Request ${req.method}:${req.url}`);
    next();
}

export default requestLogging;