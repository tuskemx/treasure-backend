const express = require("express");
const apiRouter = express.Router();
const treasureRouter = require('./treasureRouter')

apiRouter.use("/treasure", treasureRouter);

module.exports = apiRouter;