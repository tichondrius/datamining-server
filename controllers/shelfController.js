const Shelf = require('../models/index').Shelf;

const shelfController = () => {
  const get = (req, res) => {
    var query = {};
    Shelf.find({})
      .populate('goods')
      .exec((err, shelfes) => {
        if (err) {
          res.status(404).send(err);
        }
        else res.json(shelfes);
    });
  }
  const getById = (req, res) => {
    res.json(req.shelf);
  }
  const put = (req, res) => {
    const { body } = req;
    const { coor, rad, height, width } = body;
    if (req.shelf.goods.length === 0) {
      if (coor != undefined && Array.isArray(coor) && coor.length === 2) {
        req.shelf.coor = coor;
      }
      if (rad != undefined) {
        req.shelf.rad = rad;
      }
      if (height != undefined) {
        req.shelf.height = height;
      }
      if (width != undefined) {
        req.shelf.width = width
      }
      req.shelf.save((err) => {
        if (err) {
          res.status(404);
        }
        else res.json(req.shelf);
      });
    }
    res.status(404).send('Shelf have goods can not update');
  }

  return {
    get: get,
    getById: getById,
    put: put
  };
}
module.exports = shelfController;