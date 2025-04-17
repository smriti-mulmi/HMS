const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = require("../controller/register");
const login = require("../controller/login");
const room = require("../controller/rooms");
const router = express.Router();

router.post('/register',register)
router.post('/login',login)

router.get("/rooms",room)
module.exports = router;
