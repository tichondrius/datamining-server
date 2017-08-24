const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const transactionModel = new Schema({
  goods: [{ type: Schema.Types.ObjectId, ref: 'Good' }]
});

module.exports = mongoose.model('Transacion', transactionModel);