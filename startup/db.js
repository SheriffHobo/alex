const mongoose = require('mongoose');
const seed = require('./seeds');
const { User } = require('../models/user');
const { Category } = require('../models/category');
const { Shelf } = require('../models/shelf');
const { Item } = require('../models/item');

const dbName = process.env.DB_NAME;

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true })
    .then(async () => {
      console.log(`Connected to ${dbName}...`);

      const users = await User.find();
      if (!users.length) seed();
    })
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}