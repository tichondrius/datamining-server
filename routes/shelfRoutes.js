const express = require('express');
var routes = (Shelf) => {
  let shelfRouter = express.Router();
  const shelfController = require('../controllers/shelfController')(Shelf);
  shelfRouter.route('/')
    .get(shelfController.get);

  return shelfRouter;
}
module.exports = routes;