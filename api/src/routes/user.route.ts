import express from "express";
import { isAdmin, loggedIn } from "../controllers/test.controller";
import { verifyToken } from "../middleware/verifyToken";
import {
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/user.Controller";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
