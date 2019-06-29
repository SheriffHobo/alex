const mongoose = require('mongoose');
const seed = require('./seeds');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { Shelf } = require('../models/shelf');
const { Item } = require('../models/item');

const dbName = process.env.DB_NAME;
const dbPath = process.env.DB_PATH;


module.exports = () => {
  mongoose.connect(dbPath + dbName, { useNewUrlParser: true }) //JACK'S DATA BASE!!!!!!!
    .then(async () => {
      console.log(`Connected to ${dbName}...`);
      const users = await User.find();
      if (!users.length) seed();
    })
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}