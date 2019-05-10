const treasureRouter = require('express').Router();
const {
  selectTreasures, postNewTreasure
} = require('../controllers/controllers');


treasureRouter.route('/').get(selectTreasures).post(postNewTreasure)

module.exports = treasureRouter;

// _posts a new treasure to a shop_

// - should post a new treasure to a given shop
// - your new treasure should have the following keys
//   - treasure_name
//   - colour
//   - age
//   - cost_at_auction
//   - shop_id (references an existing shop_id)