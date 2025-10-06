const level = process.env.LOGGING_LEVEL ?? 2;

export function debug(message) {
    if (level <= 1)
        printMessage(message, "DEBUG");
}

export function info(message) {
    if (level <= 2)
        printMessage(message, "INFO");
}

export function error(message) {
    if (level <= 3)
        printMessage(message, "ERROR");
}

export function warning(message) {
    if (level <= 4)
        printMessage(message, "WARNING");
}

function printMessage(message, type) {
    console.log(`[${getTime()}][${type}]: ${message}`);
}

function getTime() {
    const time = new Date(Date.now());
    return time.toISOString();
}

export default { debug, info, error, warning };