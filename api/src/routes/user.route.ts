import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
	deleteUser,
	getNotification,
	getUser,
	getUsers,
	profilePosts,
	savePost,
	updateUser,
} from "../controllers/user.Controller";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.get("/profile/posts", verifyToken, profilePosts);
router.get("/read/notification", verifyToken, getNotification);

export default router;
