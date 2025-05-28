const express = require('express')
const {bookSeat, getBookingByTicket } = require('../controllers/booking.controller')
const authMiddleware = require('../middlewares/auth-middleware')


const router = express.Router()

router.post('/book-seat', authMiddleware ,bookSeat)
router.post('/find-ticket', authMiddleware ,getBookingByTicket)


module.exports = router