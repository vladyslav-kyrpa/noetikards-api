export const success = (res, data, message = "Success") => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
}

export const badRequest = (res, message) => {
    return res.status(400).json({
        success: false,
        message,
        error: "Bad request"
    });
}

export const internalError = (res) => {
    return res.status(500).json({
        success: false,
        error: "Internal server error"
    });
}

export const notImplemented = (res) => {
    return res.status(501).json({
        success: false,
        error: "End-point is not implemented"
    });
}

export const notAuthenticated = (res) => {
    return res.status(401).json({
        success: false,
        error: "Not authenticated"
    });
}

export default { success, badRequest, internalError, notImplemented, notAuthenticated };