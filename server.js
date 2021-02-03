const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(5000, function () {
  console.log('Example app listening on port 3000!\n');
});

// "@babel/core": "^7.12.10",
//     "@babel/preset-env": "^7.12.11",
//     "@babel/preset-react": "^7.12.10",
//     "babel-loader": "^8.2.2",
//     "clean-webpack-plugin": "^3.0.0",
//     "css-loader": "^5.0.1",
//     "dotenv": "^8.2.0",
//     "file-loader": "^6.2.0",
//     "html-webpack-plugin": "^4.5.1",
//     "path": "^0.12.7",
//     "path-browserify": "^1.0.1",
//     "style-loader": "^2.0.0",
//     "url-loader": "^4.1.1",
//     "webpack": "^4.29.0",
//     "webpack-cli": "^3.2.1",
//     "webpack-dev-server": "^3.1.14"