require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectToDb = require('../config/db')
const authRouter = require('../routes/auth.route.js')


const PORT = process.env.PORT || 5003



const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())


app.use('/api/auth',authRouter)




app.listen(PORT, ()=>{
    connectToDb()
    console.log(`Server is running on port ${PORT}`)
})


