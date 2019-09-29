var path = require('path');
var nodeExternals = require('webpack-node-externals');

var config = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: '[name].js',
    library: 'serverless-pg',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist'),
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: { node: '6' },
                useBuiltIns: 'usage',
                corejs: 2,
              }],
            ],
          },
        },
      },
    ],
  },
  node: {
    __filename: false,
    __dirname: false,
  },
};

module.exports = config;
