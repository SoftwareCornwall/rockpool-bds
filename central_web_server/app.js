const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static('ui_files'))

app.post('/', function(req, res){
	res.send('POST request to the homepage')	
})

app.listen(3000, () => console.log('App listening on port 3000!'))
