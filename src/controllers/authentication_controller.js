import authService from "../services/authentication_service.js";
import logger from "../utils/logger.js";
import responses from "../utils/responses.js";
import useTokenAuth from "../middlewares/jwt_authentication.js";
import runMiddleware from "../middlewares/run_middlerawe.js";


export async function login(req, res) {
    const credentials = req.body;
    if (!isValidLoginReq(credentials)) {
        logger.info("User sent invalid data to the log-in endpoint", {
            params: Object.keys(credentials)
        });
        return responses.badRequest(res, "Invalid data format");
    }

    try {
        var result = await authService.loginUserAsync(credentials);
        if (!result.success) {
            logger.info(`Failed log-in attempt: ${result.error}`);
            return responses.badRequest(res, "Invalid credentials");
        }
        logger.info("User have logged in");
        return responses.success(res, { token: result.data });
    } catch (error) {
        logger.error("Error during user log-in", error);
        return responses.internalError(res);
    }
}

export async function register(req, res) {
    const credentials = req.body;
    if (!isValidRegisterReq(credentials)) {
        logger.info("User sent invalid data to the register endpoint", {
            params: Object.keys(credentials)
        });
        return responses.badRequest(res, "Invalid data format");
    }

    try {
        const result = await authService.registerUserAsync(credentials);
        if (!result.success) {
            logger.info(`Failed to registed new user: ${result.error}`);
            return responses.badRequest(res, result.error)
        }
        logger.info("Registered new user", result);
        return responses.success(res, { id: result.data }, "Registered new user");
    } catch (error) {
        logger.error("Error during user register", error);
        return responses.internalError(res);
    }
}

export async function check(req, res) {
    await runMiddleware(req, res, useTokenAuth);

    if (!req.user)
        return responses.notAuthenticated(res);

    return responses.success(res, {
        id: req.user.id,
        username: req.user.username
    });
}

function isValidLoginReq({ username, password }) {
    return !!(username && password);
}

function isValidRegisterReq({ username, email, password }) {
    return !!(username && email && password);
}
