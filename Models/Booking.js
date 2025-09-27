const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  showtime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShowTime",
    required: true,
  },
  seats: [
    {
      seatNumber: String
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
