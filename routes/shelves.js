const auth = require('../middleware/auth');
const { Shelf, validate } = require('../models/shelf');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  let limit = 20;
  const requestedLimit = Math.abs(parseInt(req.query.limit));
  if (requestedLimit && requestedLimit <= limit) limit = requestedLimit;

  const query = {
    flagged: { $lt: 2 },
    deleted: false,
    private: false,
    $or: [],
  };

  if (!req.user.allowNsfw) query.nsfw = false;

  if (req.query.shelfId) {
    validateId(req.query.shelfId, 'shelf');
    query.shelfId = mongoose.Types.ObjectId(req.query.shelfId);

    return queryAndSend(res, query, limit, true);
  };

  if (req.query.userId) {
    validateId(req.query.userId, 'user');
    query.userId = mongoose.Types.ObjectId(req.query.userId);

    return queryAndSend(res, query, limit, false);
  };

  if (req.query.categoryId) {
    validateId(req.query.categoryId, 'category');
    query.categoryId = mongoose.Types.ObjectId(req.query.categoryId);

    return queryAndSend(res, query, limit, false);
  };

  if (req.query.search) {
    // VALIDATE

    const search = new RegExp(req.query.search, 'i');
    query.$or.push({ name: search }, { description: search });

    if (!req.query.category) return queryAndSend(res, query, limit, false);
  };

  if (req.query.category) {
    // VALIDATE

    const category = new RegExp(req.query.category, 'i');
    query.$or.push({ categoryName: category }, { customCategory: category });

    return queryAndSend(res, query, limit, false);
  };

  return res.status(400).json({ message: 'Invalid shelf request' });
});

function validateId(id, type) {
  const error = !/^[a-fA-F0-9]{24}$/.test(id);

  if (error) return res.status(400).json({ message: `Invalid ${type} ID.`});
}

async function queryAndSend(res, query, limit, findOne) {
  if (query.$or && !query.$or.length) delete query.$or;

  const shelves = findOne
    ? await Shelf.findOne(query)
    : await Shelf.find(query).limit(limit);

  res.status(200).json(shelves);
}

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

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