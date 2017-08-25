const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionModel = new Schema({
  goods: [{ type: Schema.Types.ObjectId, ref: 'Good' }],
});

module.exports = mongoose.model('Transaction', transactionModel);
