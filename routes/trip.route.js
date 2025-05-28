const express = require('express')
const { createTrip, markTripFull } = require('../controllers/trip.controller')


const router = express.Router()


router.post('/create-trip',createTrip)
router.put('/update-trip', markTripFull)


module.exports = router