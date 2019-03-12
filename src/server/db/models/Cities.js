const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  temp: String,
  created_at: Date
}, {
  timestamps: {createdAt: 'created_at'}
});

const Cities = mongoose.model('City', CitySchema);

module.exports = Cities;