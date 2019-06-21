const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
// const items = require('../routes/items');
// const shelves = require('../routes/shelves');

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  // app.use('/api/items', items);
  // app.use('/api/shelves', shelves);

  // shelf, item, etc

  app.use(error);
}