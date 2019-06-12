const mongoose = require('mongoose');

const dbName = 'alexandria'

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/alexandria', { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${'alexandria'}...`))
    .catch((err) => console.error('DB CONNECTION ERROR', err));
}