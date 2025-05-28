require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectToDb = require('../config/db')
const authRouter = require('../routes/auth.route.js')
const bookingRouter = require('../routes/booking.route.js')
const createBusRouter = require('../routes/createBus.route.js')
const tripRouter = require('../routes/trip.route')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')


const PORT = process.env.PORT || 5003

const authLimiter = rateLimit({
    windowMs: 15 * 60 *1000,
    max: 5,
    message: 'Too many Attempts please try again'
})



const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())



app.use('/api/auth',authLimiter,authRouter)
app.use('/api/user/booking', bookingRouter)
app.use('/api/admin/create',createBusRouter)
app.use('/api/admin/trip',tripRouter)




app.listen(PORT, ()=>{
    connectToDb()
    console.log(`Server is running on port ${PORT}`)
})


