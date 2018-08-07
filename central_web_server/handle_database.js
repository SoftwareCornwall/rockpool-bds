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
		{"id":1, "name": "Swordfishius Maximus"},
		{"id":2, "name": "Sharkus Terribilis"},
		{"id":3, "name": "Fishius Naughtius"},
		{"id":4, "name": "Fishus Cannis"}
		]
	},
	{
		"species_list_id": 3,
		"species_list": "wracks",
		"species": [
		{"id":1, "name": "Cerebral Wrack"},
		{"id":2, "name": "Plebius Wrack"},
		{"id":3, "name": "Pugilus Wrack"}
		]
	},
	{
		"species_list_id": 4,
		"species_list": "lost pennies",
		"species": [
		{"id":1, "name": "10p"},
		{"id":2, "name": "20p"},
		{"id":3, "name": "50p"},
		{"id":4, "name": "5p"},
		{"id":5, "name": "1p"},
		{"id":6, "name": "2p"},
		{"id":7, "name": "£1"}
		]
	}
];

async function recursiveData(data) {
  let connection = await mysql.createConnection(config.connection);
  let groupEntryData = [];
  for (let group of data) {
    let insertData = [];
    
    let queryGroup = squel
      .insert()
      .into("species_group")
      .setFieldsRows([{name: group.species_list}])
      .toString()
    //console.log(queryGroup);
    let groupId = await connection.query(queryGroup);
    //console.log(groupId.insertId);
    groupId = groupId.insertId;
    for (let species of group.species) {
      insertData.push({name: species.name});
    }
    let querySpecies = squel
      .insert()
      .into("species")
      .setFieldsRows(insertData)
      .toString()
    //console.log(querySpecies);
    let speciesId = await connection.query(querySpecies);
    //console.log(speciesId.insertId);
    speciesId = speciesId.insertId;
    
    // groupEntryData.push({ species_group_id: groupId, species_id: speciesId });
    groupEntryData.push(concatIds(groupId, speciesId, insertData.length, ["species_group_id", "species_id"], true));
  }
  //console.log(groupEntryData);
  let groupEntryQuery = squel
    .insert()
    .into("species_group_entry")
    .setFieldsRows([].concat.apply([], groupEntryData))
    .toString()
  console.log(groupEntryQuery);
  let groupEntryId = await connection.query(groupEntryQuery);
  console.log(groupEntryId);
}
function concatIds(groupId, startingIndex, qty, fieldNames, retStr = false) {
  let output = [];
  for (let id = startingIndex; id < (startingIndex + qty); id++) {
    let obj = {};
    obj[fieldNames[0]] = (retStr ? groupId.toString() : groupId);
    obj[fieldNames[1]] = (retStr ? id.toString() : id);
    output.push(obj);
  }
  //console.log(output);
  return output;
}

recursiveData(exampleData);
/*
function submitSurveyResultImplementation(connection, result) {
}

async function submitSurveyResult(result) {
  let connection = await mysql.createConnection(config.connection);
  submitSurveyResultImplementation(connection, result);
  connection.end();
}*/

module.exports = recursiveData;

