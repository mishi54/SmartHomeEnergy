import express from "express";
import { auth } from "../middleware/auth.js";
import { handleChat } from "../controller/chatController.js";

const router = express.Router();

router.post("/", auth, handleChat);

export default router;
