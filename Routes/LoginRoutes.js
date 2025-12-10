import express from "express";
import { initUser } from "../Controllers/Logincontroller.js";

const router = express.Router();

// POST /user/init
router.post("/init", initUser);

export default router;
