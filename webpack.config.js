const path = require('path');
module.exports = {
  entry: './src/js/game.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  mode: 'development'
};