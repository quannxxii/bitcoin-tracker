const mongoose = require('mongoose');

const bitcoinPriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BitcoinPrice', bitcoinPriceSchema);