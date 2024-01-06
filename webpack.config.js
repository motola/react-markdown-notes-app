import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default {
  entry: './index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // path to your HTML template
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: './',
    port: 2000,
  },
};
