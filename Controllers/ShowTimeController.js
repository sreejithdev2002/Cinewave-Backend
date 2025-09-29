const ShowTime = require("../Models/ShowTime");
const generateSeats = require("../Utils/generateSeats");

const AddShowTime = async (req, res) => {
  try {
    const { movie, theater, date, time, layout } = req.body;

    const rows = layout?.rows || 12;
    const seatsPerRow = layout?.seatsPerRow || 20;

    const seats = generateSeats(rows, seatsPerRow);

    const newShowTime = new ShowTime({
      movie,
      theater,
      date,
      time,
      seats,
    });

    await newShowTime.save();

    res.status(201).json({
      message: "Showtime Added Successfully",
      newShowTime,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.find().populate("movie", "title posterUrl");
    if (!showTime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    res.status(201).json({
      message: "Fetched Showtime Successfully",
      showTime,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetShowTimeById = async (req, res) => {
  try {
    const showTime = await ShowTime.findById(req.params.id).populate("movie");
    if (!showTime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    res.status(201).json({
      message: `Showtime Fetched Successfully : ${showTime.movie.title}`,
      showTime,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetShowTimeByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const showTime = await ShowTime.find({ movie: movieId }).populate("movie");
    if (!showTime)
      return res.status(404).json({
        message: "Showtime Not Found For This Movie",
      });

    res.status(201).json({
      message: "Showtime Fetched Successfully",
      showTime,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const UpdateShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!showTime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    res.status(201).json({
      message: "Successfully Updated Showtime",
      showTime,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const DeleteShowTime = async (req, res) => {
  try {
    const showTime = await ShowTime.findByIdAndDelete(req.params.id);
    if (!showTime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    res.status(201).json({
      message: "Successfully Deleted Showtime",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  AddShowTime,
  GetShowTime,
  GetShowTimeById,
  GetShowTimeByMovie,
  UpdateShowTime,
  DeleteShowTime,
};
