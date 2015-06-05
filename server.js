
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

app.use(methodOverride());
app.use(bodyParser());
app.use("/angular-example", express.static(__dirname + "/dist/"));

exports.start = function(port){
    app.listen(port);
    console.log("Server listening on port " + port);
}