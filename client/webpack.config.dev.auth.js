const path = require("path");

module.exports = {
  entry: {
    main: ["webpack-hot-middleware/client?reload=true", path.join(__dirname, "/ScriptsApp/CoreApp/index.tsx")]
  }
};
