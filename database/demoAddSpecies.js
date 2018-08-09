const database = require("../central_web_server/handle_database.js");
database.addSpeciesData([
	{
		"species_list_id": 1,
		"species_list": "crabs",
		"species": [
      {"id":1, "name": "crabby mc crabface"},
      {"id":2, "name": "mr.crabs"}
		]
	},
	{
		"species_list_id": 3,
		"species_list": "wracks",
		"species": [
		  {"id":1, "name": "wracky mc wrackface"}
		]
	}
]);
