const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
    name: String,
  }, { timestamps: true })
  


  module.exports = mongoose.model('Station', stationSchema)