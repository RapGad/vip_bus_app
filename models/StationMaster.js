const mongoose = require('mongoose');

const stationMasterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignedStation: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }
}, { timestamps: true });

module.exports = mongoose.model('StationMaster', stationMasterSchema);
