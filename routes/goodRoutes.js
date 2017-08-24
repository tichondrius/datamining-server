const express = require('express');

var routes = () => {
  let goodRouter = express.Router();
  const goodController = require('../controllers/goodController')();
  goodRouter.route('/')
    .get(goodController.get);
  goodRouter.route('/')
    .post(goodController.post);
  goodRouter.route('/moveToShelf')
    .post(goodController.moveToShelf);
  goodRouter.route('/:goodId')
    .get(goodController.getById);
  return goodRouter;
}
module.exports = routes;