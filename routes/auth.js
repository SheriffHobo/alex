const auth = require('../middleware/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, validateLogin } = require("../models/user");
const express = require('express');
const router = express.Router();

// LOGIN
router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message});

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: 'Invalid email or password.' });

	const token = user.generateAuthToken();
	console.log('gen', token)
	const firstName = user.firstName;
	const _id = user._id;

  res.status(200).json({ token, firstName, _id });
});

// LOGIN W TOKEN (prevents the splash page from disappearing if invalid token)
router.get('/', auth, async (req, res) => {
	const token = req.headers['x-auth-token'];
	const firstName = req.user.firstName;
	const _id = req.user._id;

	res.status(200).json({
		token,
		firstName,
		_id,
	});
});

module.exports = router;