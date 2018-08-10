const exampleData = require("../example_data/placeholder_locations_db.json");
const database = require("../central_web_server/handle_database.js");
database.addLocation(exampleData);
