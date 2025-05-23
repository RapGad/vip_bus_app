const mongoose = require('mongoose')


const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database is connected Succefully")
        
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}


module.exports = connectToDb