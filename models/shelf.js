const Joi = require('joi');
const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  name: {                 // shelf name
    type: String,
    required: true,
    maxLength: 127,
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
  // image: {             // MVP ignore this and use a default shelf image
  //   type: String,
  // },
  // thumbnail: {
  //   type: String,      // same as above
  // },
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

// function validate(shelf) {
//   const schema = {

//   };

//   return Joi.validate(shelf, schema);
// }

exports.Shelf = Shelf;
// exports.validate = validate;