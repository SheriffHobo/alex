const auth = require('../middleware/auth');
const { Item, validate } = require('../models/item');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  let limit = 20;
  const requestedLimit = Math.abs(parseInt(req.query.limit));
  if (requestedLimit && requestedLimit <= limit) limit = requestedLimit;

  const itemId = req.query.itemId;
  const shelfId = req.query.shelfId;
  const userId = req.query.userId;
  const categoryId = req.query.categoryId;

  const query = {
    flagged: { $lt: 2 },
    deleted: false,
    private: false,
    $or: [],
  };

  if (!req.user.allowNsfw) query.nsfw ;

  if (itemId) {
    if (!/^[a-fA-F0-9]{24}$/.test(itemId)) {
      return res.status(400).json({ message: `Invalid item ID.`});
    };

    query.itemId = mongoose.Types.ObjectId(itemId);
    return queryAndSend(res, query, limit);
  };

  if (shelfId) {
    if (!/^[a-fA-F0-9]{24}$/.test(shelfId)) {
      return res.status(400).json({ message: `Invalid shelf ID.`});
    };

    query.shelfId = mongoose.Types.ObjectId(shelfId);
    return queryAndSend(res, query, limit);
  };

  if (userId) {
    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      return res.status(400).json({ message: `Invalid user ID.`});
    };

    query.userId = mongoose.Types.ObjectId(userId);
    return queryAndSend(res, query, limit);
  };

  if (categoryId) {
    if (!/^[a-fA-F0-9]{24}$/.test(categoryId)) {
      return res.status(400).json({ message: `Invalid categoryId ID.`});
    };

    query.categoryId = mongoose.Types.ObjectId(categoryId);
    return queryAndSend(res, query, limit);
  };

  if (req.query.search) {
    // VALIDATE

    const search = new RegExp(req.query.search, 'i');
    query.$or.push({ name: search }, { description: search });

    if (!req.query.category) return queryAndSend(res, query, limit);
  };

  if (req.query.category) {
    // VALIDATE

    const category = new RegExp(req.query.category, 'i');
    query.$or.push({ categoryName: category }, { customCategory: category });

    return queryAndSend(res, query, limit);
  };

  return res.status(400).json({ message: 'Invalid item request' });
});

async function queryAndSend(res, query, limit) {
  if (query.$or && !query.$or.length) delete query.$or;

  const items = limit === 1
    ? await Item.findOne(query)
    : query._id
    ? await Item.findById(query._id)
    : await Item.find(query).limit(limit);

  res.status(200).json(items);
}


router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
// ADD USERID

// CHECK SHELF TO BE SURE USER OWNS IT
  item = new Item({
    name: req.body.name,
    description: req.body.description,
    paid: req.body.paid,
    shelfId: mongoose.Types.ObjectId(req.body.shelfId),
    categoryName: req.body.categoryName,
    categoryId: req.body.categoryId,
    customCategory: req.body.customCategory,
    private: req.body.private,
    nsfw: req.body.nsfw,
    image: req.body.image,
    specs: req.body.specs,
    quantity: req.body.quantity,
    currentlyOwn: req.body.currentlyOwn,
    image: req.body.image,
    tags: req.body.tags,
    masterItemId: req.body.masterItemId,
    masterItemSource: req.body.masterItemSource,
    masterItemLink: req.body.masterItemLink,
    userId: mongoose.Types.ObjectId(req.user._id),
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(200).json({ firstName: user.firstName });
});

module.exports = router;