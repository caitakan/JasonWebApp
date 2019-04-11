const fs = require('fs');
const colors = require('colors');

const fileName = ".npmrc";

let cleanFile = (fileName) => {
    fs.writeFile(fileName, "", function(err, data){
        if (err) {
            console.log(err.toString().bold.yellow);
            return;
        }
        console.log(("Updated file "+fileName).green);
    })
};

cleanFile(fileName);