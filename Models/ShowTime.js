const mongoose = require("mongoose");

const showTimeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seats: [
    {
      seatNumber: String,
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ShowTime", showTimeSchema);
