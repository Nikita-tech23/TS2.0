const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
entry: './src/index.ts',
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
  },
  ],
},
resolve: {
  extensions: ['.tsx', '.ts', '.js','.css'],
},
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
},
  // ...остальные настройки
  plugins: [
      new DefinePlugin({
          'process.env.API_URL': JSON.stringify('https://newsapi.org/v2/'),
          'process.env.API_KEY': JSON.stringify('46c53bd874064bbbba43c9237c481629'),
      }),
      new HtmlWebpackPlugin({
          template: './src/index.html', // Путь к вашему index.html
      }),
  ],
};