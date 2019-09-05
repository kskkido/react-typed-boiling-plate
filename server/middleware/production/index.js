const express = require('express');
const config = require('../../config');

const router = express.Router();

module.exports = router
  .get('*', (_, res) => {
    res.sendFile(path.join(config.outputPath, 'index.html'));
  });
