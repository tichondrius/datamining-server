const express = require('express');
const Shelf = require('../models/index').Shelf;

var routes = () => {
  let shelfRouter = express.Router();
  const shelfController = require('../controllers/shelfController')();
  shelfRouter.route('/')
    .get(shelfController.get);
  

  shelfRouter.use('/:shelfId', (req, res, next) => {
    Shelf.findById(req.params.shelfId, (err, shelf) => {
      if (err) res.status(404).send(err);
      else {
        req.shelf = shelf;
        next();
      }
    });
  });
  shelfRouter.route('/:shelfId')
    .get(shelfController.getById)
  shelfRouter.route('/:shelfId')
    .put(shelfController.put)
  return shelfRouter;
}
module.exports = routes;