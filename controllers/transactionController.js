const async = require('async');
const { Transaction, Shelf } = require('../models/index');

const transactionController = () => {
  const get = (req, res) => {
    const query = {};
    Transaction.find({})
      .exec((err, trans) => {
        if (err) {
          res.status(404).send(err);
        } else res.json(trans);
      });
  };
  const post = (req, res) => {
    const { goods } = req.body;
    if (goods && Array.isArray(goods)) {
      const tasks = goods.map((goodId, index) => (callback) => {
        const selector = {
          goods: goodId,
        };
        Shelf.findOne(selector, (err, shelf) => {
          if (err) {
            callback(err);
          } else if (!shelf) {
            callback('Can not find good in shelf');
          } else {
            const index = shelf.goods.indexOf(goodId);
            shelf.goods.splice(index, 1);
            shelf.save((err) => {
              if (err) {
                callback(err);
              } else callback(null, shelf);
            });
          }
        });
      });
      async.parallelLimit(tasks, 1, (err, result) => {
        if (err) {
          res.status(404).send(err);
        } else {
          const transaction = new Transaction();
          transaction.goods = goods;
          transaction.save((err) => {
            if (err) {
              res.status(404).send(err);
            } else res.json(transaction);
          });
        }
      });
    } else res.status(404).send('Nothing to transaction');
  };

  return {
    get,
    post,
  };
};
module.exports = transactionController;
