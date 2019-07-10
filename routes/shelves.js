const auth = require('../middleware/auth');
const { Shelf, validate } = require('../models/shelf');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', auth, async (req, res) => {
	let limit = 20;
	const requestedLimit = Math.abs(parseInt(req.query.limit));
	if (requestedLimit && requestedLimit <= limit) limit = requestedLimit;
	const shelfId = req.query.shelfId;
	const userId = req.query.userId;
	const categoryId = req.query.categoryId;

	const query = {
		flagged: { $lt: 2 },
		deleted: false,
		private: false,
		$or: []
	};

	if (!req.user.allowNsfw) query.nsfw = false;

	if (shelfId) {
		if (!/^[a-fA-F0-9]{24}$/.test(shelfId)) {
			return res.status(400).json({ message: `Invalid shelf ID.` });
		}

		query.shelfId = mongoose.Types.ObjectId(shelfId);
		return queryAndSend(res, query, limit);
	}

	if (userId) {
		if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
			return res.status(400).json({ message: `Invalid user ID.` });
		}

		query.userId = mongoose.Types.ObjectId(userId);
		return queryAndSend(res, query, limit);
	}

	if (categoryId) {
		if (!/^[a-fA-F0-9]{24}$/.test(categoryId)) {
			return res.status(400).json({ message: `Invalid category ID.` });
		}

		query.categoryId = mongoose.Types.ObjectId(categoryId);
		return queryAndSend(res, query, limit);
	}

	if (req.query.search) {
		const search = new RegExp(req.query.search, 'i');
		query.$or.push({ name: search }, { description: search });

		if (!req.query.category) return queryAndSend(res, query, limit);
	}

	if (req.query.category) {
		const category = new RegExp(req.query.category, 'i');
		query.$or.push({ categoryName: category }, { customCategory: category });

		return queryAndSend(res, query, limit);
	}

	return res.status(400).json({ message: 'Invalid shelf request' });
});

router.get('/me', auth, async (req, res) => {
	let limit = 20;
	const requestedLimit = Math.abs(parseInt(req.query.limit));
	if (requestedLimit && requestedLimit <= limit) limit = requestedLimit;

	const userId = mongoose.Types.ObjectId(req.user._id);
	const query = { userId };

	return queryAndSend(res, query, limit);
});

async function queryAndSend(res, query, limit) {
	if (query.$or && !query.$or.length) delete query.$or;

	const shelves =
		limit === 1
			? await Shelf.findOne(query)
			: query._id ? await Shelf.findById(query._id) : await Shelf.find(query).limit(limit);

	res.status(200).json(shelves);
}

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

	shelf = new Shelf({
		name: req.body.name,
		description: req.body.description,
		categoryName: req.body.categoryName,
		categoryId: req.body.categoryId,
		customCategory: req.body.customCategory,
		// private: req.body.private,
		// nsfw: req.body.nsfw,
		image: req.body.image,
		userId: mongoose.Types.ObjectId(req.user._id)
	});

	await shelf.save();

	res.status(200).json(shelf);
});

module.exports = router;
