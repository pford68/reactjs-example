var path = require("path");
var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        react: "./src/js/main.js"
    },
    output: {
        path: path.join(__dirname, "build"),
        publicPath: "js/reactjs-example.js",
        filename: "reactjs-example.js"
    }

};
