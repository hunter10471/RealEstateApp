import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
	addChat,
	getChat,
	getChats,
	readChat,
} from "../controllers/chat.controller";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.post("/read/:id", verifyToken, readChat);

export default router;
