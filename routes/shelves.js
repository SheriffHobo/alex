const auth = require('../middleware/auth');
const { Item, validate } = require('../models/item');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  shelf = new Shelf({
    name: req.body.name,
		description: req.body.description,
		categoryName: req.body.categoryName,
		categoryId: req.body.categoryId,
		customCategory: req.body.customCategory,
		private: req.body.private,
		nsfw: req.body.nsfw,
		image: req.body.image,
  });

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({ firstName: user.firstName });
});

module.exports = router;