const express = require('express');

var routes = () => {
  let homeRouter = express.Router();
  const homeController = require('../controllers/homeController')();
  homeRouter.route('/')
    .get(homeController.get);
  
  return homeRouter;
}
module.exports = routes;