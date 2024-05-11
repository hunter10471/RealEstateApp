import express from "express";
import { isAdmin, loggedIn } from "../controllers/test.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/logged-in", verifyToken, loggedIn);
router.get("/is-admin", isAdmin);

export default router;
