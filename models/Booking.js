const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  seatNumber: { type: Number, required: true },
  pickupPoint: { type: String, required: true },
  bookingStatus: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'pending'], 
    default: 'confirmed' 
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
    default: 'unpaid'
  },
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  },  
  phone: String

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
