const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        trim: true
    },
    capacity: Number,
    isActive: true
},{timestamps: true})



module.exports = mongoose.model('Bus', busSchema)