import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  category: { type: String, required: true },
  candidateId: { type: String, required: true }, // Fixed typo: candidatedId -> candidateId
  votedAt: { type: Date, default: Date.now } // Fixed duplicate 'category' field
}, {
  timestamps: true // Adds createdAt/updatedAt automatically
});

// UNIQUE constraint - prevents duplicate votes per phone+category
voteSchema.index({ phone: 1, category: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
