const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User, validate } = require("../models/user");
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid email or password.');

	const token = user.generateAuthToken();
  res.json(token);
});

module.exports = router;