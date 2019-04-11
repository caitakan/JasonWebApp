const express = require("express");
const path = require("path");
const open = require("open");
const webpack = require("webpack");
const commonConfig = require("../webpack.config.dev.common");
const webpackMerge = require("webpack-merge");

const port = 8888;
const app = express();
const authConfig = require("../webpack.config.dev.auth");
const mergedConfig = webpackMerge(authConfig, commonConfig);

const compiler = webpack(mergedConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: mergedConfig.output.publicPath,
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: false,
      modules: false
    }
  })
);

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../.out/", "index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}/#`);
  }
});
