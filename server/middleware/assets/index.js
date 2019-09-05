const express = require('express');
const config = require('../../config');

const router = express.Router();

module.exports = router
  .use(config.publicPath, express.static(config.outputPath))
