const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');

// shelf, item, etc

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api/users', users);
  app.use('/api/auth', auth);

  // shelf, item, etc

  app.use(error);
}