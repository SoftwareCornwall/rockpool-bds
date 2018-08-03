const mysql = require('mysql');

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

module.exports = addSurveyResults;
