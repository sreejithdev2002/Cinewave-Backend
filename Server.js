require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const userAuthRoutes = require("./Routes/UserAuthRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userAuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server Running on PORT ${PORT}`));
