import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { GuestbookModel } from "./models/guestbook.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env 파일 경로 설정
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Vite 개발 서버 주소
    credentials: true,
  })
);
app.use(express.json());

// MongoDB 연결
const MONGODB_URI =
  process.env.VITE_MONGODB_URI ||
  "mongodb+srv://admin:UQvL75MeO63Wy6MW@cluster0.xqvz8ke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// 방명록 조회
app.get("/api/guestbook", async (req, res) => {
  try {
    const entries = await GuestbookModel.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "방명록 조회 실패" });
  }
});

// 방명록 작성
app.post("/api/guestbook", async (req, res) => {
  try {
    const newEntry = new GuestbookModel(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "방명록 작성 실패" });
  }
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다`);
});
