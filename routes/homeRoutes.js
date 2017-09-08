const express = require('express');

var routes = () => {
  let homeRouter = express.Router();
  const homeController = require('../controllers/homeController')();
  homeRouter.route('/')
    .get(homeController.get);
  homeRouter.route('/getRules')
    .get(homeController.getRules);
  return homeRouter;
}
module.exports = routes;