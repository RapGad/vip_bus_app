const Trip = require('../models/Trip');
const Bus = require('../models/Bus');
const Route = require('../models/Route');

const createTrip = async (req, res) => {
  try {
    const { busId, routeId, departureTime, price } = req.body;

    if (!busId || !routeId || !departureTime || !price) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Optional: check if bus and route exist
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });

    const route = await Route.findById(routeId);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });

    const trip = new Trip({
      bus: bus._id,
      busNumber: bus.busNumber,
      route: route._id,
      departureTime,
      price,
      status: 'loading',
      bookedSeats: []
    });

    await trip.save();

    res.status(201).json({ success: true, message: 'Trip created', trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const markTripFull = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    trip.status = 'departed'; // or another status for full

    await trip.save();

    res.status(200).json({ success: true, message: 'Trip status updated', trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { createTrip, markTripFull };
