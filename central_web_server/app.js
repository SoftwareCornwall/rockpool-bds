const express = require('express')
const app = express()

var fs = require('fs');
var body_parser = require('body-parser')

app.use(body_parser.urlencoded({extended: true}))

app.use(body_parser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static('ui_files'))

app.post('/api/:id', function(req, res){
	res.send()
	var species_array = req.body.found_species.split(",")
	fs.writeFile("./ui_files/api/array.txt", species_array.toString(), function(err) {
		if(err) {
			console.log(err)
			return
		}
	});
	console.log("Survey Recieved")
})

app.listen(3000, () => console.log('App listening on port 3000!'))
