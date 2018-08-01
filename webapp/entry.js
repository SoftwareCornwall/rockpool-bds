var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.use('*', function(req, res, next) {
   console.log(Date.now() + ": " + req.originalUrl);
   next();
});

app.post("/", function(req, res) {
   console.log("     POST DATA " + req.body.species);
   res.send(req.body);
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

app.listen(3000, () => {
	console.log("Listening on port 3000!");
});
