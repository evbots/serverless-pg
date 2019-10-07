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
                targets: { node: '8' },
                /*
                 * useBuiltIns configures how @babel/preset-env handles polyfills.
                 * useBuiltIns: 'usage' - adds specific imports for polyfills when they are used in each file.
                 * useBuiltIns: 'entry' - adds individual requires to different core-js entry points based on environment.
                 * useBuiltIns: false - does not add polyfills automatically per file
                 * 
                 * Note:
                 * This library (serverless-pg) does not currently require polyfills
                 * but it may in the future. When a polyfill for node 8 is needed,
                 * a polyfill dependency will need to be added (such as
                 * @babel/polyfill or core-js/stable.
                 * See https://babeljs.io/docs/en/babel-polyfill).
                 * 
                 */
                useBuiltIns: 'usage',
                /*
                 * corejs - This option only has an effect when used alongside
                 * useBuiltIns: usage or useBuiltIns: entry, and ensures
                 * @babel/preset-env injects the correct imports for your
                 * core-js version.
                 */
                corejs: 2,
                /*
                 * modules: 'auto' (default) which will automatically select 'false' if the current 
                 * process is known to support ES module syntax, or "commonjs" otherwise.
                 * When targeting node v8, transformations from ES module syntax to module.exports
                 * will occur.
                 */
                modules: 'auto',
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
