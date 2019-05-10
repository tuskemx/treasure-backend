const connection = require('../db/connection');

exports.fetchTreasures = ({
  sort_by = 'cost_at_auction',
  order = 'asc',
  limiter,
  colour,
  max_age
}) => {
  return connection.select('*')
    .from('treasures')
    .orderBy(sort_by, order)
    .limit(limiter || 25)
    .modify((query) => {
      if (colour) query.where({
        colour
      });
      // if (max_age) query.where({
      //   max_age
      // })
    });;
};