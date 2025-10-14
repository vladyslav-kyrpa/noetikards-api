import authService from "../services/authentication_service.js";
import logger from "../utils/logger.js";
import responses from "../utils/responses.js";

export async function register(req, res) {
    logger.debug(req.body);
    const credentials = req.body;
    if (!isValidRegisterReq(credentials)) {
        logger.info("User sent invalid data to the register endpoint",
            Object.keys(credentials))
        return responses.badRequest(res, "Invalid data format");
    }

    try {
        const result = await authService.registerUserAsync(credentials);
        if (!result.success) {
            logger.info("Failed to registed new user", result.error);
            return responses.badRequest(res, result.error)
        }
        logger.info("Registered new user", result);
        return responses.success(res, { id: result.data }, "Registered new user");
    } catch (error) {
        logger.error("Error during user register", error);
        return responses.internalError(res);
    }
}

function isValidRegisterReq({ username, email, password }) {
    return !!(username && email && password);
}
