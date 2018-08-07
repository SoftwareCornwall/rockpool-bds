const mysql = require('promise-mysql');
const squel = require('squel');

const config = require("../database/config.json");

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

async function addDummyData(data) {
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
  return output;
}

//addDummyData(exampleData);
async function getSpeciesLists() {
  let connection = await mysql.createConnection(config.connection);
  let getSpecies = await connection.query(config.getAllDataQuery);
  //console.log(getSpecies);
  let output = [];
  let structureObj = {};
  for (let row of getSpecies) {
    let exists = false;
    let group = {};
    if (!structureObj[row.species_group_id.toString()]) {
      group.species_list_id = row.species_group_id;
      group.species_list = row.species_group_name;
      group.species = [];
    } else {
      exists = true;
      group = structureObj[row.species_group_id.toString()]
    }
    group.species.push({
      id: row.species_id,
      name: row.species_name
    });
    console.log(group);
    if (!exists) structureObj[row.species_group_id.toString()] = group;
  }
  for (let group of Object.keys(structureObj)) {
    output.push(structureObj[group]);
  }
  return output;
}

async function addSurveyResults() {
  
}
getSpeciesLists();
module.exports = { addDummyData, getSpeciesLists, addSurveyResults };

