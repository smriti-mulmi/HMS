const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageurls: {
    type: [String], // Array of strings to store image URLs
    required: true,
  },
  rentperday: {
    type: Number, // Integer for rent per day
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  maxcount: {
    type: Number, // Integer for max count of people
    required: true,
  },
  currentbookings: {
    type: [String], // Array to store current bookings (empty by default)
    default: [],
  },
  description: {
    type: String, // Description of the room
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
