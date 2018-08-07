const express = require('express')
const app = express()

var body_parser = require('body-parser')
var addSurveyResults = require('./handle_database.js')

app.use(body_parser.urlencoded({extended: true}))

app.use(body_parser.json())

app.use(express.static('ui_files'))

app.get('/', (req, res) => res.sendFile('index.html'))

app.post('/api/:id', function(req, res){
	res.send()
	var species_array = req.body.found_species.split(",")
	addSurveyResults(species_array)
	console.log("Survey Recieved: " + species_array.join(", "))
})

app.listen(3000, () => console.log('App listening on port 3000!'))

