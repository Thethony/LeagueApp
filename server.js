// Dependencies
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const profileRoutes = require('./Controllers/profileRoutes');
const userRoutes = require('./Controllers/userRoutes');
const authMiddleware = require('./Script/jwtService').authenticateToken;
const mongoose = require('mongoose')
//Intialize App
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

// Middleware
LeagueApp.use(cors());
LeagueApp.use(cookieParser());
LeagueApp.set('view engine', 'ejs');
LeagueApp.use(express.urlencoded({
  extended: true
}));
LeagueApp.use(express.static("Public"));
LeagueApp.use(authMiddleware);
LeagueApp.use(profileRoutes);
LeagueApp.use(userRoutes);
// Listen to port
LeagueApp.listen(PORT, function () {
  console.log(`If this LeagueApp runs let it's power level be over ${PORT}`);
});