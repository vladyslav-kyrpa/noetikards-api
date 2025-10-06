const errorHandling = (err, req, res, next) => {
    console.error(err.stack); // log for debugging

    if (err.name === "CastError")
        return res.status(400).json({ error: "Invalid ID format" });

    if (err.name === "ValidationError")
        return res.status(400).json({ error: "Validation failed", details: err.errors });

    res.status(500).json({
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined
    });
};

export default errorHandling;