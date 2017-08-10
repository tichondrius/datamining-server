const Good = require('../models/index').Good;

const goodController = () => {
  const get = (req, res) => {
    var query = {};
    Good.find({})
      .exec((err, goods) => {
        if (err) {
          res.status(404).error(err);
        }
        else res.json(goods);
    });
  }
  const getById = (req, res) => {
    const Id = req.params.goodId;
    Good.findById(Id, (err, good) => {
      if (err) res.status(404).error(error);
      else res.json(good);
    });
  }
  return {
    get: get,
    getById: getById,
  };
}
module.exports = goodController;