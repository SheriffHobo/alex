const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 127,
    },
    category: {
        type: ObjectId,     // comes from shelf
    },
    customCategory: {
        type: String,       // comes from shelf
    },
    private: {
        type: Boolean,
        default: false,
    },
    nsfw: {
        type: Boolean,
        default: false,
    },
    specs: {
        type: [],           // Array of key value pairs from shelf "form"
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1,
    },
    image: {
        type: String,       // URL !!!just use image from first object
    },
    thumbnail: {
        type: String,       // URL
    },
});

const Item = mongoose.model('Item', itemSchema);

function validate(item) {
  const schema = {

  };

  return Joi.validate(item, schema);
}

exports.Item = Item;
exports.validate = validate;