const express = require("express");
const { Register, Login } = require("../Controllers/UserAuthController");

const router = express.Router();

// POST
router.post("/register", Register);
router.post("/login", Login);

module.exports = router;
