const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 127,
  },
  description: {
    type: String,
    maxLength: 4095,
  },
  paid: {
    type: Number,
  },
  soldFor: {
    type: Number,
  },
  shelfId: {                // associated shelf
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
  userId: {               // copy category to item as well
    type: mongoose.Schema.Types.ObjectId,
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
  currentlyOwn: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {        
    type: String,
    maxLength: 1023,
    // default: '',
  },
  itemmanufacture: { 
    type: String,
    maxLength: 100,
    // default: '',
  },
  color: {            
    type: String,
    maxLength: 100,
    // default: '',
  },
  size: {           
    type: String,
    maxLength: 100,
    // default: '',
  },
  year: {                // We should add this is a calendar drop down thing
    type: String,
    maxLength: 20,
    // default: '',
  },
  thumbnail: {
    type: String,         // same as above
    maxLength: 1023,
    // default: '',
  },
  tags: [{
    type: String,
    maxLength: 127,
  }],
  // comments: [{}],         // MVP ignore; requires another collection
  masterItemLink: {       // direct link to page where master item lives, serves as id
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

function validate(item) {
  const schema = {
    name: Joi.string().max(127).required(),
    description: Joi.string().max(4095),
    paid: Joi.number(),
    soldFor: Joi.number(),
    shelfId: Joi.objectId(),
    categoryName: Joi.string().max(127),
    categoryId: Joi.objectId(),
    customCategory: Joi.string().max(127),
    private: Joi.boolean(),
    nsfw: Joi.boolean(),
    specs: Joi.object(), // https://github.com/hapijs/joi/blob/v16.0.0-rc2/API.md#joiobjectschema-notation
    quantity: Joi.number(),
    currentlyOwn: Joi.boolean(),
    image: Joi.string().max(1023),
    tags: Joi.array().items(Joi.string().max(127)),
    masterItemLink: Joi.string().max(1023),
    userId: Joi.objectId(),
  };

  return Joi.validate(item, schema);
}

exports.Item = Item;
exports.validate = validate;