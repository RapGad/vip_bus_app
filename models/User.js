const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
        ,
    password: String,
    rewardPoints:{
        type: Number,
        default: 0

    } 
},{timestamps: true})


module.exports = mongoose.model('User',userSchema)


