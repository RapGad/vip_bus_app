const express = require('express')
const {bookSeat, getBookingByTicket } = require('../controllers/booking.controller')
const authMiddleware = require('../middlewares/auth-middleware')
const getAvailableTrips = require('../controllers/getTrip.controller')


const router = express.Router()

router.post('/book-seat', authMiddleware ,bookSeat)
router.post('/find-ticket', authMiddleware ,getBookingByTicket)
router.get('/get-trips',getAvailableTrips)


module.exports = router