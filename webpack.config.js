const path = require('path')
module.exports = {
  // entry: path.join(__dirname, new string['src/index.js']),
  entry: [
    './src/index.js',
    './src/components/chat/ChatApp.js',
    './src/components/header/Header.js',
    './src/components/chat/ChatArea.js',
    './src/components/chat/ChatLog.js',
    './src/components/chat/ChatUsers.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  cache: false,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
