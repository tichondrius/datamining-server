const express = require('express');
var routes = () => {
  let shelfRouter = express.Router();
  const shelfController = require('../controllers/shelfController')();
  shelfRouter.route('/')
    .get(shelfController.get);

  return shelfRouter;
}
module.exports = routes;