const mysql = require('promise-mysql');

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

let exampleData = [
  {
    "species_list_id": 1,
    "species_list": "crabs",
    "species": [
	{"id":1, "name": "crabus minimalus"},
	{"id":2, "name": "crabus ninjarius"}
    ]
  },
  {
    "species_list_id": 2,
    "species_list": "fish",
    "species": [
    {"id":3, "name": "Swordfishius Maximus"},
    {"id":4, "name": "Sharkus Terribilis"},
    {"id":5, "name": "Fishius Naughtius"},
    {"id":6, "name": "Fishus Cannis"}
    ]
  },
  {
    "species_list_id": 3,
    "species_list": "wracks",
    "species": [
    {"id":7, "name": "Cerebral Wrack"},
    {"id":8, "name": "Plebius Wrack"},
    {"id":9, "name": "Pugilus Wrack"}
    ]
  },
  {
    "species_list_id": 4,
    "species_list": "lost pennies",
    "species": [
    {"id":10, "name": "10p"},
    {"id":11, "name": "20p"},
    {"id":12, "name": "50p"},
    {"id":13, "name": "5p"},
    {"id":14, "name": "1p"},
    {"id":15, "name": "2p"},
    {"id":16, "name": "£1"}
    ]
  }
]
async function recursiveData(data) {
	for (let group of data) {
		console.log(group);
	  // insert into species_group name = species_list
	  // get the id from above
	  let groupID = await addValue("species_group", "name", group.species_list);
	  
	  for (let species of group.species) {
		// insert into species name = name
		// get the id from the above
		// insert into species_group__entry list_id species id
		let speciesID = await addValue("species", "name", species.name);
		console.log(groupID);
		await addValue("species_group_entry", ["species_group_id", "species_id"], [groupID.insertId, speciesID.insertId]);
		
	  }
	}
}
var addValue = async function(table, field, value) {
	console.log(table, field, value);
  //if (typeof value == "object") value = [value];
  //rows.map(function(i) {return "'" + i + "'"});
  //rows = "(" + rows + ")";
  let connection = await mysql.createConnection(config.connection);
  console.log("---");
  console.log('INSERT INTO ' + table + ' (' + field + ') VALUES ' + groupData(value));
  try {
	  let resp = await connection.query('INSERT INTO ' + table + ' (' + field + ') VALUES ' + groupData(value));
  } catch(e) {
	console.log(e);
  }
  connection.end();
  return resp;
}
var groupData = function(data) {
	let output = "(";
	for (let item of data) {
		output += item;
	}
	return output += ")";
}
recursiveData(exampleData)
module.exports = recursiveData;
