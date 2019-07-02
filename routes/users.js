const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

// USER PROFILE
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  res.status(200).json(user);
});

// SEARCH USERS
router.get('/', auth, async (req, res) => {
  if (!req.query.search) return res.status(400).json({ message: 'Please enter a search term' });

  const name = new RegExp(req.query.search, 'i');
  const users = await User
    .find({
      '$or': [
        { firstName: name },
        { lastName: name },
      ],
    })
    .select('firstName thumbnail _id');

  res.status(200).json(users);
});

// SIGN UP
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: 'User already registered.' });

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    province: req.body.province,
    city: req.body.city,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.status(200).json({ token, firstName: user.firstName });
});

module.exports = router;