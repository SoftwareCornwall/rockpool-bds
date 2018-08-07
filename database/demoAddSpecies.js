const database = require("../central_web_server/handle_database.js");
database.insertSpeciesData({
	{
		"species_list_id": 1,
		"species_list": "crabs",
		"species": [
      {"id":1, "name": "crabby mc crabface"},
      {"id":2, "name": "mr.crabs"}
		]
	}
});
