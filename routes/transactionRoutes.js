const express = require('express');

var routes = () => {
  let transactionRouter = express.Router();
  const transactionController = require('../controllers/transactionController')();
  transactionRouter.route('/')
    .get(transactionController.get)
    .post(transactionController.post);
  return transactionRouter;
}
module.exports = routes;