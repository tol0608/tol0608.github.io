import mongoose from "mongoose";

const guestbookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const GuestbookModel = mongoose.model("Guestbook", guestbookSchema);
