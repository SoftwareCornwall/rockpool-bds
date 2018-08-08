const assert = require("assert")
const database = require("../handle_database.js")

var submission_1 = {
	"species_list_id" : 4,
	"tourist_id" : ["kh39b"],
	"session_id" : "0g55l",
	"found_species" :[1,3,6,7]
}

var databaseSpy = {};

databaseSpy.querySql = [];
databaseSpy.query = function(sql) {
  querySql.push(sql);
};
databaseSpy.reset = function() {
  this.querySql = [];
}

databaseSpy.reset();
database.submitSurveyResultImplementation(databaseSpy, submission_1);
var expectedQueries = [
  "INSERT INTO survey ('tourist_id_1', 'session_id', 'species_group_id') VALUES ('kh39b', '0g551', '4')",
  "INSERT INTO survey_results ('species_id', 'survey_id') VALUES ('1',''),('3',''),('6',''),('7','')"
];
assert.deepEqual(expectedQueries, databaseSpy.querySql);

console.log('All tests passed')


connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
  if (error) throw error;
  console.log(results.insertId);
});
async
let {response, fields} =  await connection.query('INSERT INTO posts SET ?', {title: 'test'});
