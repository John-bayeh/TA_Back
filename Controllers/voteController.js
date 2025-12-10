import Vote from "../Models/vote.js";

export const checkVote = async (req, res) => {
  try {
    const { phone, category } = req.body;

    if (!phone || !category) {
      return res.status(400).json({ message: "Missing phone or category" });
    }

    const existing = await Vote.findOne({ phone, category });

    if (existing) {
      return res.json({
        voted: true,
        candidateId: existing.candidateId,
        votedAt: existing.votedAt
      });
    }

    return res.json({ voted: false });
  } catch (error) {
    console.error("Check vote error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const castVote = async (req, res) => {
  try {
    const { phone, category, candidateId } = req.body;

    if (!phone || !category || !candidateId) {
      return res.status(400).json({ 
        message: "Missing phone, category, or candidateId" 
      });
    }

    // 🔥 NEW: CHECK TOTAL VOTES LIMIT (5 FREE)
    const totalVotes = await Vote.countDocuments({ phone });
    const FREE_VOTE_LIMIT = 5;
    
    if (totalVotes >= FREE_VOTE_LIMIT) {
      return res.status(402).json({
        success: false,
        message: `🚀 UPGRADE REQUIRED! You've used all ${FREE_VOTE_LIMIT} free votes.`,
        votesUsed: totalVotes,
        maxFree: FREE_VOTE_LIMIT,
        upgradeRequired: true
      });
    }

    // Check category duplicate
    const existingCategoryVote = await Vote.findOne({ phone, category });
    if (existingCategoryVote) {
      return res.status(400).json({
        success: false,
        message: "You already voted in this category.",
        previousVote: existingCategoryVote.candidateId
      });
    }

    // SAVE NEW VOTE
    const newVote = await Vote.create({
      phone,
      category,
      candidateId: String(candidateId)
    });

    res.json({
      success: true,
      message: "Vote recorded permanently!",
      vote: newVote,
      votesUsed: totalVotes + 1,
      freeVotesLeft: FREE_VOTE_LIMIT - (totalVotes + 1)
    });

  } catch (error) {
    console.error("Cast vote error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
