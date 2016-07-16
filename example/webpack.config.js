const webpack = require('webpack');

module.exports = {
  entry: [
    './javascripts/index.jsx'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015'],
        plugins: ['transform-object-rest-spread']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  output: {
    filename: "bundle.js"
  },
};
