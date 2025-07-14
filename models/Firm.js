const mongoose = require('mongoose');
const Vendor = require('./vender')

const firmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true
  },
  category: [{
    type: String,
    enum: ['veg', 'non-veg']
  }],
  region: [{
    type: String,
    enum: ['south-indian', 'north-indian', 'chinese', 'bakery'] // lowercase for consistency
  }],
  offer: {
    type: String
  },
  image: {
    type: String

  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  product:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required: true
      }]
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;
