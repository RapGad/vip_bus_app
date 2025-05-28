const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const { nanoid } = require('nanoid')
const bookSeat = async (req, res) => {
  try {
    const userId = req.userId;  // assume auth middleware sets this
    const { tripId, seatNumber, pickupPoint } = req.body;

    if (!tripId || !seatNumber || !pickupPoint) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const trip = await Trip.findById(tripId).populate('bus');
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Check if seatNumber is within capacity
    if (seatNumber > trip.bus.capacity) {
      return res.status(400).json({ success: false, message: 'Invalid seat number' });
    }

    // Check if seat is already booked
    if (trip.bookedSeats.includes(seatNumber)) {
      return res.status(400).json({ success: false, message: 'Seat already booked' });
    }

    // Add seat to bookedSeats in trip
    trip.bookedSeats.push(seatNumber);
    await trip.save();
    const ticketNumber = nanoid(5)


    // Create booking record
    const booking = new Booking({
      user: userId,
      trip: tripId,
      seatNumber,
      pickupPoint,
      ticketNumber,
      bookingStatus: 'confirmed',
      paymentStatus: 'unpaid' // or 'paid' if you handle payment separately
    });

    await booking.save();

    res.status(201).json({ success: true, message: 'Seat booked successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const getBookingByTicket = async (req, res) => {
    try {
      const { ticketNumber } = req.params
      const booking = await Booking.findOne({ ticketNumber }).populate('trip')
      if (!booking) return res.status(404).json({ message: 'Ticket not found' })
  
      return res.status(200).json(booking)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error fetching ticket' })
    }
  }

module.exports = { bookSeat,getBookingByTicket };
