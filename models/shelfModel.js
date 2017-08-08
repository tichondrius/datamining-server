const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const shelfModel = new Schema({
  coor: Array,
  rad: Number,
  height: Number,
  width: Number,
  goods: [{ type: Schema.Types.ObjectId, ref: 'Good' }]
});
module.exports = mongoose.model('Shelf', shelfModel);