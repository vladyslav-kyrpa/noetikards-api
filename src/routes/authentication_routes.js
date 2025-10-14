import express from "express";
import { check, login, register } from "../controllers/authentication_controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/log-in", login);
router.get("/check", check);

export default router;