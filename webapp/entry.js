var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var util = require('util');
var fs = require('fs');

var app = express();

var logFile = fs.createWriteStream(__dirname + "/server.log", {flags : "w"});
var port = 3000;

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use('*', function(req, res, next) {
	var text = req.ip.padEnd(20) + "|" + Date.now() + "|:" + req.originalUrl;
	console.log(text);
	logFile.write(text + "\n");
	next();
});

app.get("/:a/:b", function(req, res) {
    res.sendFile(path.join(__dirname + "/../www/" + req.params.a + "/" + req.params.b));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../www/index.html"));
});

app.get('/:x', function(req, res) {
    res.sendFile(path.join(__dirname + "/../www/" + req.params.x));
});

app.listen(port, () => {
	console.log("Listening on port " + port + ".");
});
