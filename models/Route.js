const mongoose = require('mongoose')


const routeSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
    pickupPoints: [String],
    price: Number
},{timestamps: true})


module.exports = mongoose.model('Route', routeSchema)