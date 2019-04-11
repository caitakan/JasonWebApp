const path = require("path");

module.exports = {
  entry: {
    main: [path.join(__dirname, "/ScriptsApp/CoreApp/index.tsx")]
  },
  output: {
    filename: "[name].bundle.[hash].js",
    chunkFilename: "[name].bundle.[hash].js",
    path: path.join(__dirname, "../Pages"),
    publicPath: "./"
  }
};
