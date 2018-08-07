const exampleData = require("../central_web_server/ui_files/api/species_lists.json");
const database = require("../central_web_server/handle_database.js");
database.insertSpeciesData(exampleData);
