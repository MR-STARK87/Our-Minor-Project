import express from "express";
import tokenChecker from "../middlewares/tokenChecker.js";
import { chat, chatWithNote } from "../controllers/chat.js";

const router = express.Router();

router.post("/chat", tokenChecker, chat);
router.post("/chat-with-note", tokenChecker, chatWithNote);

export default router;
