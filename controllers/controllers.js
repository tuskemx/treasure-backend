const {
  fetchTreasures
} = require('../models/models.js');

exports.selectTreasures = (req, res, next) => {
  fetchTreasures(req.query)
    .then((treasure) => {
      res.status(200).send({
        treasure
      })
    })
};