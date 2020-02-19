const path = require('path')

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, '../', 'src/app.js')],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    open: true,
    port: 9000,
    contentBase: './',
    publicPath: '/'
  }
}
