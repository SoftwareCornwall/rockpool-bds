var express = require("express");
var path = require("path");

var app = express();

app.use('*', function(req, res, next){
   console.log(Date.now() + ": " + req.originalUrl);
   next();
});

app.get("/:a/:b", function(req, res) {
    res.sendFile(path.join(__dirname + "/" + req.params.a + "/" + req.params.b));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/:x', function(req, res) {
    res.sendFile(path.join(__dirname + "/" + req.params.x));
});

app.listen(3000, () => {
	console.log("Example app listening on port 3000!");
});
