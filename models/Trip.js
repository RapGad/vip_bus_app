const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  busNumber: {
    type: String,
    required: true
  },
  departureTime: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['loading', 'departed', 'completed', 'cancelled'], 
    default: 'loading' 
  },
  bookedSeats: [{ type: Number }], // list of seat numbers booked
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
