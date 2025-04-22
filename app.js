import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
import connectDB from "./utils/db.js";
connectDB();

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
app.use(express.json());

// Cấu hình CORS với credentials và specific origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());

// Routes
app.use(userRoutes);
app.use(authRoutes);
app.use(movieRoutes);
app.use("/api/v1/comment", commentRoutes);

// Khởi động server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 