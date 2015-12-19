
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

app.use(methodOverride());
// parse application/json
app.use(bodyParser.json());
app.use("/reactjs-example", express.static(__dirname + "/build/"));

exports.start = function(port){
    app.listen(port);
    console.log("Server listening on port " + port);
}