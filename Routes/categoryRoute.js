import express from "express";
import { getCategories, addCategory } from "../Controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/init", addCategory);

export default router;
