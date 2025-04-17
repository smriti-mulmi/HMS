const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
