const mysql = require('mysql');

const config = require("./config.json");

var connection = mysql.createConnection(config.connection);

var addSurveyResults = async function(results) {
	
	connection.connect();
	
	let queries = [];
	for (let item of results) {
		queries.push( "('" + item + "')" );
	}
	
	let response = await connection.query('INSERT INTO survey_results (species) VALUES ' + queries.join(","));
	
	connection.end();
}

module.exports = addSurveyResults;
