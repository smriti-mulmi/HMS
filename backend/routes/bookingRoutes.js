const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Importing Booking Model

// Book a Room
router.post('/book-room', async (req, res) => {
    const { userId, roomId, date } = req.body;
    if (!userId || !roomId || !date) return res.status(400).json({ error: "Missing fields" });

    try {
        const newBooking = new Booking({ userId, roomId, date });
        await newBooking.save();
        res.status(201).json({ message: "Room booked successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
