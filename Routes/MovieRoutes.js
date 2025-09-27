const express = require("express");
const { GetMovies, GetMovieById, AddMovie, UpdateMovie, DeleteMovie } = require("../Controllers/MovieController");

const router = express.Router();

// GET
router.get("/", GetMovies);
router.get("/:id", GetMovieById);

// POST
router.post("/", AddMovie);

// PUT
router.put("/:id", UpdateMovie);

// DELETE
router.delete("/:id", DeleteMovie);

module.exports = router;