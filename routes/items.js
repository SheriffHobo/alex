const auth = require('../middleware/auth');
const { Item, validate } = require('../models/item');
const express = require('express');
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

  if (req.query.itemid) {
    validateId(req.query.itemid, 'shelf');
    query.itemId = mongoose.Types.ObjectId(req.query.itemid);

    return queryAndSend(query, limit, true);
  };

  if (req.query.shelfid) {
    validateId(req.query.shelfid, 'shelf');
    query.shelfId = mongoose.Types.ObjectId(req.query.shelfid);

    return queryAndSend(query, limit, true);
  };

  if (req.query.userid) {
    validateId(req.query.userid, 'user');
    query.userId = mongoose.Types.ObjectId(req.query.userid);

    return queryAndSend(query, limit, true);
  };

  if (req.query.categoryid) {
    validateId(req.query.categoryid, 'category');
    query.categoryId = mongoose.Types.ObjectId(req.query.categoryid);

    return queryAndSend(query, limit, true);
  };

  if (req.query.search) {
    // VALIDATE

    const search = new RegExp(req.query.search, 'i');
    query.$or.push({ name: search }, { description: search });

    if (!req.query.category) return queryAndSend(query, limit, false);
  };

  if (req.query.category) {
    // VALIDATE

    const category = new RegExp(req.query.category, 'i');
    query.$or.push({ categoryName: category }, { customCategory: category });

    return queryAndSend(query, limit, false);
  };

  return res.status(400).json({ message: 'Invalid shelf request' });
});

function validateId(id, type) {
  const error = !/^[a-fA-F0-9]{24}$/.test(id);

  if (error) return res.status(400).json({ message: `Invalid ${type} ID.`});
}

async function queryAndSend(query, limit, findOne) {
  if (!query.$or.length) delete query.$or;

  const shelves = findOne
    ? await Shelf.find(query).limit(limit)
    : await Shelf.findOne(query);

  res.status(200).json(shelves);
}


router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
// ADD USERID
  item = new Item({
    name: req.body.name,
    description: req.body.description,
    paid: req.body.paid,
    shelf: req.body.shelf,
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