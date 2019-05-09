const treasureRouter = require('express').Router();
const {
  selectTreasures
} = require('../controllers/controllers');

treasureRouter.route('/').get(selectTreasures);

module.exports = treasureRouter;