import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

export const Booking = mongoose.model("Booking", bookingSchema);