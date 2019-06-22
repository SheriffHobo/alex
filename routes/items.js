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
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({ firstName: user.firstName });
});

module.exports = router;