const auth = require('../middleware/auth');
const { Shelf, validate } = require('../models/shelf');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/:userId', auth, async (req, res) => {
  const error = !/^[a-fA-F0-9]{24}$/.test(req.params.userId);
  if (error) return res.status(400).json({ message: 'Invalid ID.'});

	const userId = mongoose.Types.ObjectId(req.params.userId);
	const query = {
  	userId,
  	deleted: false,
  	private: false,
  };

  if (!req.user.allowNsfw) query.nsfw = false;

  const shelves = await Shelf.find(query);

  res.status(200).json(shelves);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
// ADD USERID
  shelf = new Shelf({
    name: req.body.name,
		description: req.body.description,
		categoryName: req.body.categoryName,
		categoryId: req.body.categoryId,
		customCategory: req.body.customCategory,
		private: req.body.private,
		nsfw: req.body.nsfw,
		image: req.body.image,
		userId: mongoose.Types.ObjectId(req.user._id),
  });

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(200).json({ firstName: user.firstName });
});

module.exports = router;