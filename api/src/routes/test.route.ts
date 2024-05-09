import express from "express";
import { isAdmin, loggedIn } from "../controllers/test.controller";

const router = express.Router();

router.get("/logged-in", loggedIn);
router.get("/is-admin", isAdmin);

export default router;
