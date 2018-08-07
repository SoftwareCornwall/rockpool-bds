const express = require('express');
const app = express();

var body_parser = require('body-parser');
var database = require('./handle_database.js');
var fs = require("fs");
var validation = require("./id_validation.js");

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('*', function (req, res, next) {
	console.log(Date.now() + ": " + req.originalUrl + ": " + req.method);
	next();
});

app.use(body_parser.urlencoded({extended: true}));

app.use(body_parser.json());

app.use(express.static('ui_files'));

app.get('/', (req, res) => res.sendFile('index.html'));

app.get('/api/getSpeciesLists', function(req, res) {
	res.send(JSON.stringify(database.getSpeciesLists()));
});

app.post('/api/submitSurveyResults', function(req, res) {
	console.log(req.body.found_species);
	for (let i = 0; i < req.body.tourist_id.length; i++) {
		if (validation.validate_id(req.body.tourist_id[i]) === false) {
			res.status(402).send("Payment Required");
			return;
		}
	}
	database.addSurveyResults_2_Electric_Boogaloo(req.body);
	res.status(200).send("OK");
});

app.post('/api/:id', function(req, res){
	res.send();
	var species_array = req.body.found_species.split(",");
	database.addSurveyResults(species_array);
	console.log("Survey Recieved: " + species_array.join(", "));
});

app.listen(3000, () => console.log('App listening on port 3000!'));
