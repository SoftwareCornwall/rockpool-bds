const mysql = require('mysql');
const fs = require('fs');

const config = require("../database/config.json");

var addSurveyResults = async function(results) {
	let connection = mysql.createConnection(config.connection);
	connection.connect();
	
	let queries = [];
	for (let item of results) {
		queries.push( "(" + connection.escape(item) + ")" );
	}
	
	let response = await connection.query('INSERT INTO survey_results (species) VALUES ' + queries.join(","));
	//console.log(response);
	connection.end();
}

var getSpeciesLists = function() {
	let species_lists_string = fs.readFileSync("./ui_files/api/species_lists.json");
	let species_lists = JSON.parse(species_lists_string);
	return species_lists;
}

var addSurveyResults_2_Electric_Boogaloo = function(results) {
	fs.writeFileSync("./ui_files/api/array.txt", JSON.stringify(results));		
}


module.exports = { addSurveyResults, getSpeciesLists, addSurveyResults_2_Electric_Boogaloo};
