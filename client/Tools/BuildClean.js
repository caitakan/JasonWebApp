const colors = require("colors");
const fs = require("fs");
const rmdir = require("rmdir");
const buildFileName = "Pages";
const buildLocation = "../";

let dfd = new Promise((resolve, reject) => {
  rmdir(buildLocation + buildFileName, err => {
    if (err) {
      console.log(err.toString().bold.yellow);
    }
    console.log("Build Clean success".green);
    resolve("Build Clean Done");
  });
});
dfd.then(() => {
  fs.mkdir(buildLocation + buildFileName, err => {
    if (err) {
      console.log(err.toString().bold.red);
    }
    console.log((buildFileName + " folder created").green);
  });
});
