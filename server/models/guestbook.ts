import mongoose from "mongoose";

const guestbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString()
  }
});

export const GuestbookModel = mongoose.model('Guestbook.post', guestbookSchema);
