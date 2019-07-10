const mongoose = require("mongoose");
const seed = require("./seeds");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const { Shelf } = require("../models/shelf");
const { Item } = require("../models/item");

const dbPath = process.env.MONGODB_URI || process.env.DB_PATH;

module.exports = () => {
  mongoose
    .connect(dbPath,
      // "mongodb://admin2:abc123@ds261616.mlab.com:61616/heroku_l4pd93qm",
      { useNewUrlParser: true, useCreateIndex: true }
    ) //JACK'S DATA BASE!!!!!!!
    .then(async () => {
      console.log(`Connected to database...`);
      const users = await User.find();
      if (!users.length) seed();
    })
    .catch(err => console.error("DB CONNECTION ERROR", err));
};
