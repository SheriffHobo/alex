const mongoose = require('mongoose');
const seed = require('./seeds');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { Shelf } = require('../models/shelf');
const { Item } = require('../models/item');

const dbPath = process.env.MONGODB_URI || process.env.DB_PATH;

module.exports = () => {
  mongoose.connect(dbPath, { useNewUrlParser: true }) //JACK'S DATA BASE!!!!!!!
    .then(async () => {
      console.log(`Connected to database...`);
      const users = await User.find();
      if (!users.length) seed();
    })
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}