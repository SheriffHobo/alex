const Joi = require('joi');
const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 127,
    },
    category: {
        type: ObjectId,
    },
    customCategory: {
        type: String,       // OPTIONAL if category doesn't exist
    },
    private: {
        type: Boolean,
        default: false,
    },
    nsfw: {
        type: Boolean,
        default: false,
    },
    form: {
        type: {},           // Custom specs NEEDS FIXIN'
    },
    image: {
        type: String,       // URL !!!just use image from first object
    },
    thumbnail: {
        type: String,       // URL
    },
    flagged: {
        type: Boolean,
        default: false,
    },
});

const Shelf = mongoose.model('Shelf', shelfSchema);

function validate(shelf) {
  const schema = {

  };

  return Joi.validate(shelf, schema);
}

exports.Shelf = Shelf;
exports.validate = validate;