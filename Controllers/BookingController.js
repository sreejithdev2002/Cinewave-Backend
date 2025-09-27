const ShowTime = require("../Models/ShowTime");
const Booking = require("../Models/Booking");

const CreateBooking = async (req, res) => {
  try {
    const { user, showtime_id, seats, totalPrice } = req.body;

    const showtime = await ShowTime.findById(showtime_id);
    if (!showtime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    const alreadyBooked = showtime.seats.filter(
      (s) => seats.includes(s.seatNumber) && s.isBooked
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        message: `Some seats are already booked: ${alreadyBooked
          .map((s) => s.seatNumber)
          .join(", ")}`,
      });
    }

    showtime.seats = showtime.seats.map((s) => {
      if (seats.includes(s.seatNumber)) {
        return { ...s.toObject(), isBooked: true };
      }
      return s;
    });

    await showtime.save();

    const booking = new Booking({
      user,
      showtime: showtime_id,
      seats: seats.map((seat) => ({ seatNumber: seat })),
      totalPrice,
    });
    await booking.save();

    res.status(201).json({
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings)
      return res.status(404).json({
        message: "Bookings Not Found",
      });

    res.status(201).json({
      message: "Bookings Fetched Successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetBookingsById = async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.id);
    if (!bookings)
      return res.status(404).json({
        message: "Bookings Not Found",
      });

    res.status(201).json({
      message: "Booking Fetched Successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const GetUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate(
      "showtime",
      "movie theater date time"
    );
    if (!bookings)
      return res.status(404).json({
        message: "Booking Not Found",
      });

    res.status(201).json({
      message: "Booking Fetched Successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const bookings = await Booking.findById(req.params.bookingId);
    if (!bookings)
      return res.status(404).json({
        message: "Booking Not Found",
      });

    const showtime = await ShowTime.findById(bookings.showtime);
    if (!showtime)
      return res.status(404).json({
        message: "Showtime Not Found",
      });

    const bookedSeats = bookings.seats.map((s) => s.seatNumber);
    showtime.seats = showtime.seats.map((s) => {
      if (bookedSeats.includes(s.seatNumber)) {
        return { ...s.toObject(), isBooked: false };
      }
      return s;
    });
    await showtime.save();

    bookings.status = "cancelled";
    await bookings.save();

    res.status(201).json({
      message: "Booking Cancelled Suucessfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  CreateBooking,
  GetAllBookings,
  GetBookingsById,
  GetUserBookings,
  CancelBooking,
};
