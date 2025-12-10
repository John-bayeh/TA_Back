import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import LoginRoutes from "./Routes/LoginRoutes.js";
import categoryRoute from "./Routes/categoryRoute.js";
import voteRoute from './Routes/voteRoute.js'

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/login", LoginRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/votes", voteRoute); 

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
