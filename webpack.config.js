import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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
      inject: true,
      // copys the content of the existing index.html to the new /build index.html
      template:  path.resolve('./index.html'),
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
