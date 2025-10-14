import express from "express";
import cors from "cors";
import requestLogging from "./middlewares/request_logging.js";
import errorHandling from "./middlewares/error_handling.js";
import mongo from "./data_access/mongo_db.js";
import log from "./utils/logger.js";
import authRoutes from "./routes/authentication_routes.js";
import auth from "./middlewares/jwt_authentication.js";

export async function run() {
    // db connection
    const connectionString = process.env.MONGO_DB_CONNECTION;
    if (!connectionString)
        throw Error("MongoDB connection string is not specified");
    await mongo.connect(connectionString)

    const port = process.env.API_PORT;
    if (!port)
        throw Error("Post is not specified");

    const hostUrl = process.env.API_HOST;
    if (!hostUrl)
        throw Error("Host is not specified");

    // config api
    const app = express();

    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    app.options('/', cors());

    app.use(express.json());

    app.use(requestLogging);

    // public routes 
    app.use("/auth", authRoutes);

    app.use(auth);

    // secure routes 
    // ...

    // global error handling
    app.use(errorHandling);

    const server = app.listen(port, () => {
        log.info(`Server is running at ${hostUrl}:${port}`);
    });

    // graceful shutdown
    const shutdown = async () => {
        log.info("Sutting down server...");
        await mongo.close();
        server.close(() => {
            log.info("Server closed");
            process.exit(0);
        });
    }

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}

export default { run };