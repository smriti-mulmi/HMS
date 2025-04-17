const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, cpassword } = req.body;

    console.log(name, email, password, cpassword);
    
    // Check if the passwords match
    if (password !== cpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // '10' is the salt rounds

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      cpassword 
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
