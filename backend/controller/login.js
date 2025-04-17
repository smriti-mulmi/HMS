
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User = require("../models/User");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log(password)
      return res.status(400).json({ message: "Invalid credentials." });
    }
  
   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token will expire in 1 hour
    });
  
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  };


  module.exports = login ;