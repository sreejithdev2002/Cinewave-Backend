const Movie = require("../Models/Movies");

const AddMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({
      message: "Movie Added Successfully.",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(201).json({
      message: "Successfully Fetched Movies.",
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).json({
        message: "Movie Not Found",
      });
    res.status(201).json({
      message: `Fetched Movie : ${movie.title}`,
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const UpdateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie)
      return res.status(404).json({
        message: "Movie Not Found",
      });

    res.status(201).json({
      message: "Movie Updated Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const DeleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res.status(404).json({
        message: "Movie Not Found",
      });
    res.status(201).json({
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddMovie,
  GetMovies,
  GetMovieById,
  UpdateMovie,
  DeleteMovie,
};
