const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 127,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 127,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,   // NOT A VALIDATOR!!! check manually
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: {          // authorization to use admin features
    type: Boolean,
    default: false,
  },
  following: {        // users
    type: [{ type: ObjectId, ref: 'User' }],
  },
  followers: {        // users
    type: [{ type: ObjectId, ref: 'User' }],
  },
  // lastActivity: {     // used for tracking activity MVP ignore
  //   type: Date,
  // },
  wishList: {         // items user wants
    type: [{ type: ObjectId, ref: 'Item' }],
  },
  flagged: {          // number of times flagged for violation
    type: Number,
    default: 0,
  },
  profileImg: {
    type: String,     // URL
    maxlength: 127,
  },
  thumbnail: {
    type: String,     // URL
    maxlength: 127,
  },
  shelfLikes: {       // list of liked shelves
    type: [{ type: ObjectId, ref: 'Shelf' }],
  },
  itemLikes: {        // list of liked items
    type: [{ type: ObjectId, ref: 'Item' }],
  },
  allowNsfw: {        // by default don't show items marked NSFW
    type: Boolean,
    default: false,
  },
  active: {           // accounts can be deactivated, which should mark all items private
    type: Boolean,
    default: true,
  },
  country: {
    type: String,
    maxlength: 255,
  },
  province: {
    type: String,     // or state, prefecture, etc
    maxlength: 255,
  },
  city: {
    type: String,
    maxlength: 255,
  },
});

userSchema.methods.generateAuthToken = function() { 
  return jwt.sign({
    _id: this._id,
    firstName: this.firstName,
    isAdmin: this.isAdmin,
    app: 'Alexandria',
    version: '1.0',
    allowNsfw: this.allowNsfw,
  }, process.env.jwtPrivateKey);
}

const User = mongoose.model('User', userSchema);

function validate(user) {
  // mirror this password validation on the login and signup pages
  // const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,1024}$");

  const schema = {
    firstName: Joi.string().alphanum().max(127).required(),
    lastName: Joi.string().alphanum().max(127).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(),
    // password: Joi.string().regex(regex).required(),
    country: Joi.string().max(255),
    province: Joi.string().max(255),
    city: Joi.string().max(255),
  };

  return Joi.validate(user, schema);
}

function validateLogin(user) {
  // mirror this password validation on the login and signup pages
  // const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,1024}$");

  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(),
    // password: Joi.string().regex(regex).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;
exports.validateLogin = validateLogin;