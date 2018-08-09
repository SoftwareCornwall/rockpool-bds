const mysql = require('promise-mysql');
const squel = require('squel');
const fs = require('fs');

const config = require("../database/config.json");


async function addSpeciesData(data) {
  let connection = await mysql.createConnection(config.connection);
  let groupEntryData = [];
  for (let group of data) {
    let insertData = [];
    
    let queryGroupExists = squel
      .select()
      .from("species_group", "id")
      .where("name = " + group.species_list)
      .toString();
    
    let queryGroup = squel
      .insert()
      .into("species_group")
      .setFieldsRows([{name: group.species_list}])
      .toString();
    
    let groupResult = await connection.query(queryGroup);
    groupId = groupResult.insertId;
    
    for (let species of group.species) {
      insertData.push({name: species.name});
    }
    
    let querySpecies = squel
      .insert()
      .into("species")
      .setFieldsRows(insertData)
      .toString();
    
    let speciesResult = await connection.query(querySpecies);
    speciesId = speciesResult.insertId;
    
    // Generates correct data objects since the id returned is just the index of the first row.
    groupEntryData.push(concatIds(groupId, speciesId, insertData.length, ["species_group_id", "species_id"], true));
  }
  let groupEntryQuery = squel
    .insert()
    .into("species_group_entry")
    .setFieldsRows([].concat.apply([], groupEntryData))
    .toString();
  let groupEntryId = await connection.query(groupEntryQuery);
  console.log(groupEntryId);
  connection.end();
  return true;
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
  let getSpecies = await connection.query("SELECT species.id as species_id, species.name as species_name, species_group.id as species_group_id, species_group.name as species_group_name FROM ((species_group_entry INNER JOIN species ON species_group_entry.species_id = species.id) INNER JOIN species_group ON species_group_entry.species_group_id = species_group.id)");
  
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
      group = structureObj[row.species_group_id.toString()];
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

async function addSurveyResults(surveyData) {
  let connection = await mysql.createConnection(config.connection);
  try {
    let surveyObj = {};
    for (let touristIndex in surveyData.tourist_id) {
      surveyObj["tourist_id_"+(parseInt(touristIndex)+1)] = surveyData.tourist_id[touristIndex];
    }
    surveyObj.session_id = surveyData.session_id;
    surveyObj.species_group_id = surveyData.species_list_id;
    let surveyQuery = squel
      .insert()
      .into("survey")
      .setFieldsRows([surveyObj])
      .toString();
    let surveyResult = await connection.query(surveyQuery);
    surveyId = surveyResult.insertId;
    let surveyResults = [];
    if (!surveyData.found_species.length) return true;
    for (let species of surveyData.found_species) {
      surveyResults.push({
        "species_id": species.species_id,
        "survey_id": surveyId
      });
    }
    let surveyResultsQuery = squel
      .insert()
      .into("survey_results")
      .setFieldsRows(surveyResults)
      .toString();
    await connection.query(surveyResultsQuery);
  } finally {
    connection.end();
  }
  return true;
}

async function addSession(data) {
  let connection = await mysql.createConnection(config.connection);
  let sessionQuery = squel
    .insert()
    .into("session")
    .setFieldsRows([data])
    .toString();
  let sessionResult = await connection.query(sessionQuery);
  connection.end();
  return sessionResult.insertId;
}

async function addLocation(data) {
  console.log(data);
  let connection = await mysql.createConnection(config.connection);
  let locationQuery = squel
    .insert()
    .into("location")
    .setFieldsRows(data)
    .toString();
  let locationResult = await connection.query(locationQuery);
  connection.end();
  return true;
}

async function getLocation() {
  let connection = await mysql.createConnection(config.connection);
  let getLocationQuery = squel
    .select()
    .from("location")
    .toString();
  let getLocationResult = await connection.query(getLocationQuery);
  console.log(getLocationResult);
  connection.end();
}

module.exports = { addSpeciesData, getSpeciesLists, addSurveyResults, addSession, addLocation, getLocation };
