const express = require('express')

const addBus = require('../controllers/addBus.controller')


const router = express.Router()


router.post('/create-bus',addBus)




module.exports = router


