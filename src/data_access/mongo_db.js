import mongoose from "mongoose";
import log from "../utils/logger.js";

export async function connect(connectionString) {
    const url = `${connectionString}?authSource=admin`;
    try {
        await mongoose.connect(url);
        log.info("Database connection established");
    } catch (error) {
        log.error(`Database connection failed: ${error}`);
    }
}

export async function close() {
    await mongoose.disconnect();
    log.info("Database connection closed");
}

export default { connect, close }