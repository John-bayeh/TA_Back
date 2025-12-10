import express from "express";
import { checkVote, castVote } from "../Controllers/voteController.js"; 

const router = express.Router();

// Check if user voted in category
router.post("/check", checkVote);

// Cast vote
router.post("/", castVote);

export default router;
