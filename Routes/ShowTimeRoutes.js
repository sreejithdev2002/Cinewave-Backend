const express = require("express");
const {
  GetShowTime,
  GetShowTimeById,
  GetShowTimeByMovie,
  AddShowTime,
  UpdateShowTime,
} = require("../Controllers/ShowTimeController");
const { DeleteMovie } = require("../Controllers/MovieController");

const router = express.Router();

// GET
router.get("/", GetShowTime);
router.get("/:id", GetShowTimeById);
router.get("/movie/:movieId", GetShowTimeByMovie);

// POST
router.post("/", AddShowTime);

// PUT
router.put("/:id", UpdateShowTime);

// DELETE
router.delete("/:id", DeleteMovie);

module.exports = router;
