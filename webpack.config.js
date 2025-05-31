const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './index.js',
    output: {
        filename: 'main.js'

    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: {
        index: 'index.html'
      },
      compress: true,
      port: 9000,
    },
    mode: "development",
    plugins: [new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      })
    ],
    module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|gif)$/i,
        loader: 'file-loader',
        options: {
        name: '[path][name].[ext]',
        },
      },
    ],
  },
  optimization: {
      minimizer: [
      '...',
      new CssMinimizerPlugin(),
      ],
  },
  
}