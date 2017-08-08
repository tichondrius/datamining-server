const express = require('express');

var routes = (Shelf) => {
  var bookRouter = express.Router();
  var bookController = require('../controllers/goodController')(Shelf);
  bookRouter.route('/')
    .get(bookController.get);
  return bookRouter; 
}
module.exports = routes;