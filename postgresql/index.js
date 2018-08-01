const { Client } = require('pg');

const config = require("./config.json");

const client = new Client();

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

/*client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})*/
/*
client.query('SELECT * FROM creatures', function(err, res) {
	console.log(res.rows)
	client.end()
})
*/
