const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const shelves = require('../routes/shelves');
const items = require('../routes/items');
const chats = require('../routes/chats'); //added this
const follow = require('../routes/follow');

const error = require('../middleware/error');

module.exports = function(app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/shelves', shelves);
	app.use('/api/items', items);
	app.use('/api/chats', chats);
	app.use('/api/follow', follow);
	app.use(error);
};
