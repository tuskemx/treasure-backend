const {
  fetchTreasures,
  createTreasure
} = require('../models/models.js');

exports.selectTreasures = (req, res, next) => {
  fetchTreasures(req.query)
    .then((treasure) => {
      res.status(200).send({
        treasure
      })
    })
};

exports.postNewTreasure = (req, res, next) => {
  const newTreasure = req.body;
  createTreasure(newTreasure)
    .then(treasure => {
      // might have to reformat to destructure array of objects
      res.status(201).send({ treasure })
    })
    .catch(console.log)
}



