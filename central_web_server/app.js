const express = require('express');
const app = express();


var body_parser = require('body-parser');
var database = require('./handle_database.js');
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

app.get('/api/getSpeciesLists', async function(req, res) {
	var lists = await database.getSpeciesLists();
	console.log(lists);
	res.send(JSON.stringify(lists));
});

app.post('/api/submitSurveyResults', async function(req, res) {
	console.log(req.body.found_species);
	for (let i = 0; i < req.body.tourist_id.length; i++) {
		if (validation.validate_id(req.body.tourist_id[i]) === false) {
			res.status(402).send("Payment Required");
			return;
		}
	}
	var success = await database.addSurveyResults(req.body);
	if (success) { res.status(200).send("OK"); }
	else { res.status(500).send("An Error Occured"); }
});

app.post('/api/finishSessionSetup', async function(req, res) {
	console.log(req.body);
	let sessionID = await database.addSession(req.body)
	res.status(200).send(sessionID);
});

app.get('/api/getLocations', async function(req, res) {
	var locations =  await database.getLocation();
	console.log("get locations called!");
	console.log(locations);
	res.send(JSON.stringify(locations));
});

app.listen(3000, () => console.log('App listening on port 3000!'));
