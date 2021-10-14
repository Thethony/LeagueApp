// Dependencies
const express = require("express");
const mongoose = require('mongoose')

// Initialize app
const LeagueApp = express();
// Configure Settings
require("dotenv").config();
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
// Connect to Database
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection
db.on('connected', () => {
  console.log(`Connected to MongoDB`)
});
db.on('error', (error) => {
  console.log(`An Error Occurred with MangoDB ${error.message}`)
})

// Listen to port
LeagueApp.listen(PORT, function () {
    console.log(`If this LeagueApp runs let it's power level be over ${PORT}`);
  });