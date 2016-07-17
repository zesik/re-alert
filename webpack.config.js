const webpack = require('webpack');

module.exports = {
  entry: [
    './entry.js'
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
    path: 'lib',
    filename: 'index.js',
    library: 're-alert',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react',
    'react-addons-css-transition-group': 'react-addons-css-transition-group',
    'react-dom': 'react-dom',
    'react-redux': 'react-redux',
    redux: 'redux',
    'redux-thunk': 'redux-thunk'
  }
};
