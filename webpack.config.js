const path = require('path');

module.exports = {
  entry: "./lib/blokify.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map',
};
