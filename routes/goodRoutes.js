const express = require('express');

var routes = (Good) => {
  let goodRouter = express.Router();
  const goodController = require('../controllers/goodController')(Good);
  goodRouter.route('/')
    .get(goodController.get);
  goodRouter.route('/:goodId')
    .get(goodController.getById);
  return goodRouter;
}
module.exports = routes;