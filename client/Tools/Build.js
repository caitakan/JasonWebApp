const express = require("express");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const webpackMerge = require("webpack-merge");
const expressConfig = require("../webpack.config.express");
const colors = require("colors");
const strings = require("./BuildStrings");
const fs = require("fs");
const rmdir = require("rmdir");
const buildFileName = "Pages";
const buildLocation = "../";
process.env.NODE_ENV = strings.production;

try {
  let mergedConfig;
  const authConfig = require("../webpack.config.auth");
  mergedConfig = webpackMerge(authConfig, webpackConfig);

  webpack(mergedConfig).run((err, stats) => {
    if (err) {
      console.error("ERROR:", err.toString().bold.red);
      return 1;
    }

    const jsonStats = stats.toJson();

    if (stats.hasErrors()) {
      return jsonStats.errors.map(error => console.error("ERROR:", error.toString().red));
    }

    if (stats.hasWarnings()) {
      console.warn("Webpack generated the following warnings: ".bold.yellow);
      jsonStats.warnings.map(warning => console.warn(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    console.log(("Finsihed compiling. Output is in " + buildLocation + buildFileName).green);

    return 0;
  });
} catch (error) {
  console.error("ERROR:", error.toString().bold.red);
  console.error("ERROR:", "FAILED TO BUILD!!!! see above errors".bold.red);
}
