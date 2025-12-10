// login.js
import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    freeVotes: { type: Number, default: 5 },
    premiumVotes: { type: Number, default: 0 },
    totalVotesUsed: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  }
);

export default mongoose.model("Login", LoginSchema);
