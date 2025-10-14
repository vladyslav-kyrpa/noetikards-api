import logger from "../utils/logger.js";
import responses from "../utils/responses.js";
import jwt from "jsonwebtoken";

export default function useTokenAuth(req, res, next) {
    const issuerKey = process.env.JWT_KEY;
    if (!issuerKey) throw Error("JWT_KEY is not defined");

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    if (!token)
        return responses.notAuthenticated(res);

    jwt.verify(token, issuerKey, (error, user) => {
        if (error) {
            logger.error("Failed to verify a token", error);
            return responses.notAuthenticated(res);
        }
        req.user = user;
        next();
    });
}