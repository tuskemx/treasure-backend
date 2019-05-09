const {
  fetchTreasures
} = require('../models/models.js');

exports.selectTreasures = (req, res, next) => {
  fetchTreasures()
    .then((treasure) => {
      res.status(200).send({
        treasure
      })
    })
};
