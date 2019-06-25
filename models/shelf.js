const Joi = require('joi');
const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  name: {                 // shelf name
    type: String,
    required: true,
    maxLength: 127,
  },
  description: {
    type: String,
    maxLength: 4095,
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
  firstName: {
    type: String,
    maxLength: 127,
  },
  private: {              // true = invisible to public
    type: Boolean,
    default: false,
  },
  nsfw: {                 // true = invisible to users with showNsfw: false
    type: Boolean,
    default: false,
  },
  form: [{                // arbitrary list of properties for user to describe object
    type: String,
    maxLength: 127,
  }],
  image: {             // MVP ignore this and use a default shelf image
    type: String,
    maxLength: 1023,
  },
  thumbnail: {
    type: String,      // same as above
    maxLength: 1023,
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

const Shelf = mongoose.model('Shelf', shelfSchema);

function validate(shelf) {
  const schema = {
    name: Joi.string().max(127).required(),
    description: Joi.string().max(4095),
    categoryName: Joi.string().max(127),
    categoryId: Joi.objectId(),
    customCategory: Joi.string().max(127),
    private: Joi.boolean(),
    nsfw: Joi.boolean(),
    image: Joi.string().max(1023),
    userId: Joi.objectId(),
    firstName: Joi.string().max(127),
  };

  return Joi.validate(shelf, schema);
}

exports.Shelf = Shelf;
exports.validate = validate;