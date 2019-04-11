const express = require("express");
const path = require("path");
const open = require("open");
const webpack = require('webpack');

const port = 15063;
const app = express();

app.use(express.static(path.join(__dirname, '../../Pages/')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../Pages/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}/#`);
    }
});