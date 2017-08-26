const async = require('async');
const { Good, Shelf } = require('../models/index');


const goodController = () => {
  const post = (req, res) => {
    const { body } = req;
    const newGood = new Good();
    newGood.size = body.size;
    newGood.cat = body.cat;
    newGood.price = Number(body.price);
    newGood.dateImport = new Date();
    newGood.slug = body.slug;
    newGood.coor = body.coor;
    newGood.save((err) => {
      if (err) {
        res.status(404).send(err);
      }
      const shelfId = body.shelfId;
      Shelf.findById(shelfId, (err, shelf) => {
        if (err) {
          res.status(404).send(err);
        } else {
          shelf.goods.push(newGood._id);
          shelf.save((err) => {
            if (err) res.status(404).send(err);
            else res.json(newGood);
          });
        }
      });
    });
  };
  const get = (req, res) => {
    const query = {};
    Good.find({})
      .exec((err, goods) => {
        if (err) {
          res.status(404).send(err);
        } else res.json(goods);
      });
  };
  const getById = (req, res) => {
    const Id = req.params.goodId;
    Good.findById(Id, (err, good) => {
      if (err) res.status(404).send(error);
      else res.json(good);
    });
  };


  const moveToShelf = (req, res) => {
    const { shelfId, goodId, newShelfId, newCoor } = req.body;
    async.waterfall([
      (callback) => {
        Shelf.findById(shelfId, (err, shelf) => {
          if (err) {
            callback(err);
          } else {
            callback(null, shelf);
          }
        });
      },
      (shelf, callback) => {
        Good.findById(goodId, (err, good) => {
          if (err) {
            callback(err);
          } else {
            callback(null, shelf, good);
          }
        });
      },
      (shelf, good, callback) => {
        Shelf.findById(newShelfId, (err, newShelf) => {
          if (err) {
            callback(err);
          } else {
            callback(null, {
              shelf,
              good,
              newShelf,
            });
          }
        });
      },
    ], (err, dataFetch) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const { shelf, good, newShelf } = dataFetch;
        const index = shelf.goods.indexOf(good._id);
        shelf.goods.splice(index, 1);
        newShelf.goods.push(good._id);
        good.coor = newCoor;
        async.parallel([
          (callback) => {
            shelf.save((err) => {
              if (err) {
                callback(err);
              } else callback(null, shelf);
            });
          },
          (callback) => {
            newShelf.save((err) => {
              if (err) {
                callback(err);
              } else callback(null, newShelf);
            });
          },
          (callback) => {
            good.save((err) => {
              if (err) {
                callback(err);
              } else callback(null, good);
            });
          },
        ], (err, result) => {
          if (err) res.status(404).send(err);
          else res.json(result);
        });
      }
    });
  };
  return {
    get,
    getById,
    post,
    moveToShelf,
  };
};
module.exports = goodController;
