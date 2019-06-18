const mongoose = require('mongoose');
const seed = require('./seeds');
const { User } = require('../models/user');

const dbName = process.env.DB_NAME;

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true })
    .then(async () => {
      console.log(`Connected to ${dbName}...`);

      const jack = await User.findOne({ email: 'jack@email.com' });
      if (!jack) seed();
    })
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}