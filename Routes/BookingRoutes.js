const express = require("express");
const {
  GetAllBookings,
  GetBookingsById,
  GetUserBookings,
  CreateBooking,
  CancelBooking,
} = require("../Controllers/BookingController");

const router = express.Router();

// GET
router.get("/", GetAllBookings);
router.get("/:id", GetBookingsById);
router.get("/user/:userId", GetUserBookings);

// POST
router.post("/", CreateBooking);

// PUT
router.put("/cancel/:bookingId", CancelBooking);

module.exports = router;
