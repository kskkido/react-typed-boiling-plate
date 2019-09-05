const path = require('path');
const express = require('express');
const morgan = require('morgan');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../../../webpack.config/client');

const router = express.Router();
const compiler = webpack(config);

module.exports = router
  .use(morgan('combined'))
  .use(
    devMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  )
  .use(
    hotMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  )
  .get('*', (_, res) => {
    compiler.outputFileSystem.readFile(
      path.join(compiler.outputPath, 'index.html'),
      (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      }
    );
  });
