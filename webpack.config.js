const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './index.js',
    devtool: "inline-source-map",
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
    mode: "production",
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
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  optimization: {
      minimizer: [
      '...',
      new CssMinimizerPlugin(),
      ],
  },
  
}