const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 127,
  },
  description: {},
  paid: {
    type: Number,
  },
  shelf: {                // associated shelf
    type: mongoose.Schema.Types.ObjectId,
  },
  categoryName: {         // name of custom or preset category (whichever exists, prefer preset)
    type: String,
    maxLength: 127,
  },
  categoryId: {           // copy category to item as well
    type: mongoose.Schema.Types.ObjectId,
  },
  customCategory: {       // user defined category if desired isn't in presets
    type: String,
    maxLength: 127,
  },
  private: {              // true = invisible to public
    type: Boolean,
    required: true,
    default: false,
  },
  nsfw: {                 // true = invisible to users with showNsfw: false
    type: Boolean,
    required: true,
    default: false,
  },
  specs: {                // arbitrary key value pairs from "form" on shelf
    type: Map,
    of: String,
  },
  quantity: {             // how many of this exact item user owns
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  image: {                // url
    type: String,
    maxLength: 1024,
    // default: '',
  },
  thumbnail: {
    type: String,         // same as above
    maxLength: 1024,
    // default: '',
  },
  tags: [{
    type: String,
    maxLength: 127,
  }],
  // comments: [{}],         // MVP ignore; requires another collection
  masterItemId: {         // ID used to find master item from 3rd party API
    type: String,
  },
  masterItemSource: {     // which API to use to find master item
    type: String,
  },
  masterItemLink: {       // direct link to page where master item lives
    type: String,
  },
  deleted: {              // hides item, marks for deletion
    type: Boolean,
    required: true,
    default: false,
  },
  flagged: {              // number of times flagged for violation
    type: Number,
    default: 0,
  },

});

const Item = mongoose.model('Item', itemSchema);

// function validate(item) {
//   const schema = {

//   };

//   return Joi.validate(item, schema);
// }

exports.Item = Item;
// exports.validate = validate;