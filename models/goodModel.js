const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const goodModel = new Schema({
  id: Schema.Types.ObjectId,
  size: Number,
  cat: String,
  price: Number,
  dateImport: Date,
  slug: String,
  coor: Array,
});

module.exports = mongoose.model('Good', goodModel);