const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    minlength: 2,
    maxlength: 127,
  },
  last: {
    type: String,
    minlength: 2,
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
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // following: {
  //   type: [ObjectId],
  // },
  // followers: {
  //   type: [ObjectId],
  // },
  // lastActivity: {
  //   type: Date,
  // },
  // wishList: {
  //   type: [ObjectId],
  // },
  flagged: {
    type: Boolean,
    default: false,
  },
  profileImg: {
    type: String,     // URL
    minlength: 2,
    maxlength: 127,
  },
  thumbnail: {
    type: String,     // URL
    minlength: 2,
    maxlength: 127,
  },
  // shelfLikes: {
  //   type: [ObjectId],
  // },
  // itemLikes: {
  //   type: [ObjectId],
  // },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.generateAuthToken = function() { 
  return jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin,
    app: 'Alexandria',
    version: '1.0',
  }, process.env.jwtPrivateKey);
}

const User = mongoose.model('User', userSchema);

function validate(user) {
  // mirror this password validation on the front end
  const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,1024}$");

  const schema = {
    name: Joi.string().alphanum().min(2).max(127).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(regex).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;