import log from "../utils/logger.js"

const requestLogging = (req, res, next) => {
    log.info("Incoming request", {
        method: req.method,
        url: req.url
    });
    next();
}

export default requestLogging;