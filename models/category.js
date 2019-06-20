const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 127,
  },
  description: {
    type: String,
    maxLength: 4095,
  },
  nsfw: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,       // URL !!!just use image from first object
    maxLength: 1023,
  },
  thumbnail: {
    type: String,       // URL
    maxLength: 1023,
  },
});

const Category = mongoose.model('Category', categorySchema);

// function validate(category) {
//   const schema = {

//   };

//   return Joi.validate(category, schema);
// }

exports.Category = Category;
// exports.validate = validate;