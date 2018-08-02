const mysql = require('mysql');

const config = require("./config.json");

var connection = mysql.createConnection(config.connection);

connection.connect();

connection.query('SELECT * FROM creatures', function (error, results, fields) {
  if (error) throw error;
  console.log('The results are: ', results);
});
 
connection.end();
