const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, validateLogin } = require("../models/user");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('auth POST')
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json('Invalid email or password.');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json('Invalid email or password.');

	const token = user.generateAuthToken();
  res.status(200).json(token);
});

module.exports = router;