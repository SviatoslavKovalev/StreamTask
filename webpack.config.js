const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 4200
  },
  plugins: [
    new HTMLPlugin({
      template: './index.html'
    })
  ]
}
