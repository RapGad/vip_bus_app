const express = require('express')

const {addBus,addStation,addRoute,getRoute} = require('../controllers/addBus.controller')


const router = express.Router()


router.post('/create-bus',addBus)
router.post('/add-station',addStation)
router.post('/add-route',addRoute)
router.get('/get-route',getRoute)




module.exports = router


