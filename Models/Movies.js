const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: [
    {
      type: String,
    },
  ],
  language: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  posterUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
