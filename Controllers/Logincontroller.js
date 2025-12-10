// loginController.js
import User from "../Models/login.js";

export const initUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "phone is required",
      });
    }

    // find by phone
    let user = await User.findOne({ phone });

    if (!user) {
      user = new User({
        uid: phone,        // or some generated id
        phone,
        freeVotes: 3,
        premiumVotes: 0,
        totalVotesUsed: 0,
      });

      await user.save();
      console.log("➡️ New user created:", phone);
    }

    return res.json({
      success: true,
      user: {
        uid: user.uid,
        phone: user.phone,
        freeVotes: user.freeVotes,
        premiumVotes: user.premiumVotes,
        totalVotesUsed: user.totalVotesUsed,
      },
    });
  } catch (err) {
    console.error("User init error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
