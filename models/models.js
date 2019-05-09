const connection = require('../db/connection');

exports.fetchTreasures = () => {
  return connection.select('*').from('treasures').orderBy('cost_at_auction', 'asc');
};