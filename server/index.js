const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 27017;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// write code to connect to the database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bitcoin/bitcoin', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });
// write code to define API routes
const BitcoinPrice = require('./models/bitcoinPrice');

// route to fetch bitcoin data
app.get('/api/bitcoin-prices', async (req, res) => {
  try {
    const {period, startDate, endDate} = req.query;
    let query = {};

    if (period === 'day') {
      // set query to fetch data for the past day
      query.timestamp = {$gte: new Date() - 24 * 60 * 60 * 1000};
    } else if (period === 'week') {
      // set query to fetch data for the past week
      query.timestamp = {$gte: new Date() - 7 * 24 * 60 * 60 * 1000};
    } else if (period === 'month') {
      // set query to fetch data for the past month
      query.timestamp = {$gte: new Date() - 30 * 24 * 60 * 60 * 1000};
    } else if (period === 'year') {
      // set query to fetch data for the past year
      query.timestamp = {$gte: new Date() - 365 * 24 * 60 * 60 * 1000};
    } else if (period === 'custom' && startDate && endDate) {
      // set query to fetch data for the custom period
      query.timestamp = {$gte: new Date(startDate), $lt: new Date(endDate)};
    }

    const bitcoinPrices = await BitcoinPrice.find(query).sort('-timestamp');
    res.json(bitcoinPrices);
  } catch (error) {
    console.error('Error fetching bitcoin prices', error);
    res.status(500).json({error: 'Error fetching bitcoin prices'});
  }
});

// route to save bitcoin data
app.post('/api/bitcoin-prices', async (req, res) => {
  try {
    const {price} = req.body;
    const bitcoinPrice = new BitcoinPrice({price});
    await bitcoinPrice.save();
    res.json(bitcoinPrice);
  } catch (error) {
    console.error('Error saving bitcoin price', error);
    res.status(500).json({error: 'Error saving bitcoin price'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
