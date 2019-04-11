const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const strings = require("./Tools/BuildStrings");
const GLOBALS = {
  "process.env.NODE_ENV": JSON.stringify(strings.production)
};

module.exports = {
  mode: strings.production,
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -20,
          chunks: "all"
        }
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "./index.html")
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: false,
      tslint: "./tslint.json",
      tslintAutoFix: false,
      async: false,
      reportFiles: ["!node_modules/**/*", "!node_modules/@types/**/*"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  target: "web",
  module: {
    rules: [
      {
        test: /\.(png|jpg|ico)$/,
        loader: "file-loader",
        options: {
          name: "Content/[name].[ext]?[hash]",
          publicPath: "/Pages"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: "Content/fonts/[name].[ext]?[hash]",
          publicPath: "/Pages"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss", ".css", ".png", ".ico", ".json"]
  },
  devtool: "none"
};
