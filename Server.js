require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");

// ROUTES IMPORT
const userAuthRoutes = require("./Routes/UserAuthRoutes");
const movieRoutes = require("./Routes/MovieRoutes");
const showTimeRoutes = require("./Routes/ShowTimeRoutes");
const bookingRoutes = require("./Routes/BookingRoutes");

const app = express();

// DATABSE CONNECTION
connectDB();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", userAuthRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/showtimes", showTimeRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server Running on PORT ${PORT}`));
