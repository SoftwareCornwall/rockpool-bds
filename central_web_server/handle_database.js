const mysql = require('promise-mysql');
const squel = require('squel');

const config = require("../database/config.json");


async function insertSpeciesData(data) {
  let connection = await mysql.createConnection(config.connection);
  let groupEntryData = [];
  for (let group of data) {
    let insertData = [];
    
    let queryGroup = squel
      .insert()
      .into("species_group")
      .setFieldsRows([{name: group.species_list}])
      .toString()
    
    let groupResult = await connection.query(queryGroup);
    groupId = groupResult.insertId;
    
    for (let species of group.species) {
      insertData.push({name: species.name});
    }
    
    let querySpecies = squel
      .insert()
      .into("species")
      .setFieldsRows(insertData)
      .toString()
    
    let speciesResult = await connection.query(querySpecies);
    speciesId = speciesResult.insertId;
    
    // Generates correct data objects since the id returned is just the index of the first row.
    groupEntryData.push(concatIds(groupId, speciesId, insertData.length, ["species_group_id", "species_id"], true));
  }
  let groupEntryQuery = squel
    .insert()
    .into("species_group_entry")
    .setFieldsRows([].concat.apply([], groupEntryData))
    .toString()
  let groupEntryId = await connection.query(groupEntryQuery);
  connection.end();
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

async function getSpeciesLists() {
  let connection = await mysql.createConnection(config.connection);
  let getSpecies = await connection.query("getAllDataQuery": "SELECT species.id as species_id, species.name as species_name, species_group.id as species_group_id, species_group.name as species_group_name FROM ((species_group_entry INNER JOIN species ON species_group_entry.species_id = species.id) INNER JOIN species_group ON species_group_entry.species_group_id = species_group.id)");
  
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
    if (!exists) structureObj[row.species_group_id.toString()] = group;
  }
  for (let group of Object.keys(structureObj)) {
    output.push(structureObj[group]);
  }
  connection.end();
  return output;
}

async function addSurveyResults() {
  
}

var addSurveyResults_2_Electric_Boogaloo = function(results) {
	fs.writeFileSync("./ui_files/api/array.txt", JSON.stringify(results));		
}


module.exports = { insertSpeciesData, getSpeciesLists, addSurveyResults, addSurveyResults_2_Electric_Boogaloo };
