const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HappyPack = require("happypack");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].bundle.[hash].js",
    path: path.join(__dirname, ".out/"),
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
    hotUpdateChunkFilename: ".hot/hot-update.js",
    hotUpdateMainFilename: ".hot/hot-update.json"
  },
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
    }
  },
  target: "web",
  devServer: {
    contentBase: ".out/",
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "./index.html")
    }),
    new HappyPack({
      id: "ts",
      threads: 3,
      loaders: [
        {
          path: "ts-loader",
          query: { happyPackMode: true }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: "./tslint.json",
      tslintAutoFix: true,
      tsconfig: "./tsconfig.json",
      async: false,
      reportFiles: ["ScriptsApp/**/*"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|ico)$/,
        loader: "file-loader",
        options: {
          name: ".img/[name].[ext]?[hash]",
          publicPath: "/"
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: ".fonts/[name].[ext]?[hash]",
          publicPath: "/"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "happypack/loader?id=ts"
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss", ".css", ".png", ".ico", ".json"]
  },
  devtool: "eval-source-map"
};
