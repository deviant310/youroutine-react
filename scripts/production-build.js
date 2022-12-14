require('dotenv').config();

const webpack = require('webpack');
const configFactory = require('../config/webpack/webpack.config');
const config = configFactory('production');
const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) throw err;

  console.log(stats.toString(config.stats));
});
