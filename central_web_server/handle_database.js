const mysql = require('promise-mysql');
const squel = require('squel');

const config = require("../database/config.json");

/*var addSurveyResults = async function(surveyResults) {
  let connection = await mysql.createConnection(config.connection);
  // connection.connect();
  
  let queries = [];
  for (let item of surveyResults) {
    queries.push( "(" + connection.escape(item) + ")" );
  }
  console.log('INSERT INTO species (name) VALUES ' + queries.join(","));
  let resp = await connection.query('INSERT INTO species (name) VALUES ' + queries.join(","));
  //let resp = await connection.query('SELECT * FROM species WHERE id="1"');
  console.log(resp);
  connection.end();
}*/


async function recursiveData(data) {
	for (let group of data) {
	  // insert into species_group name = species_list
	  // get the id from above
	  let groupID = connection.query(squel);
	  /*
	  for (let species of group.species) {
		  console.log(species)
		// insert into species name = name
		// get the id from the above
		// insert into species_group__entry list_id species id
		let speciesID = 
		console.log(groupID);
		
	  }*/
	}
}
//recursiveData(exampleData)

function submitSurveyResultImplementation(connection, result) {
}

async function submitSurveyResult(result) {
  let connection = await mysql.createConnection(config.connection);
  submitSurveyResultImplementation(connection, result);
  connection.end();
}

module.exports = { recursiveData, submitSurveyResult, submitSurveyResultImplementation };

