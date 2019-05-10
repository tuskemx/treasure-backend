const connection = require('../db/connection');

exports.fetchTreasures = ({
  sort_by = 'cost_at_auction',
  order = 'asc',
  limiter,
  colour,
  max_age,
  min_age,
  max_price,
  min_price
}) => {
  return connection.select('*')
    .from('treasures')
    .orderBy(sort_by, order)
    .limit(limiter || 25)
    .modify((query) => {
      if (colour) query.where({
        colour
      });
      if (max_age) query.where(
        'age', '<', max_age);
      if (min_age) query.where(
        'age', '>', min_age)
      if (max_price) query.where(
        'cost_at_auction', '<', max_price)
      if (min_price) query.where(
        'cost_at_auction', '>', min_price)
    })
};

exports.createTreasure = (body) => {

  return connection.insert(body)
    .into('treasures')
    .returning('*')
    .then(insertedTreasure => {
      return insertedTreasure;
    })
}

