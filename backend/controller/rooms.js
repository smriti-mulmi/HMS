
const Room = require("../models/rooms");
const room =  async (req, res) => {
    console.log("room")
  try {
    const rooms = await Room.find(); 
    res.json(rooms); 
  } catch (err) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

module.exports = room;
