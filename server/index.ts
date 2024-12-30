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
    origin: ["http://localhost:5173", "https://tola.synology.me:7000"],
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
    // Guestbook 컬렉션에서 데이터 조회
    const entries = await GuestbookModel.find({}, {
      _id: 1,
      name: 1,
      message: 1,
      createdAt: 1
    }).sort({ createdAt: -1 });

    console.log('Fetched entries:', entries); // 디버깅용 로그

    if (!entries || entries.length === 0) {
      console.log('No entries found'); // 디버깅용 로그
      return res.json([]); // 데이터가 없는 경우
    }

    res.json(entries);
  } catch (error) {
    console.error("MongoDB 조회 에러:", error); // 디버깅용 로그
    res.status(500).json({ error: "방명록 조회 실패" });
  }
});

// 방명록 작성
app.post("/api/guestbook", async (req, res) => {
  try {
    const { name, message } = req.body;
    
    const newEntry = new GuestbookModel({
      name,
      message,
      createdAt: new Date().toISOString()
    });

    const savedEntry = await newEntry.save();
    console.log('Saved entry:', savedEntry); // 디버깅용 로그
    
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error("MongoDB 저장 에러:", error); // 디버깅용 로그
    res.status(500).json({ error: "방명록 작성 실패" });
  }
});

const PORT = process.env.SERVER_PORT || 5005;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다`);
});
