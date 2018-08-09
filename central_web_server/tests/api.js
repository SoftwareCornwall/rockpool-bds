var request = require("request-promise-native")
var fs = require('fs');

var post_json = async function (target, stateChangeHandler, jsonFile) {
	let json = JSON.parse(fs.readFileSync(jsonFile));
	console.log(json);
	var options = {
		method: 'POST',
		uri: target,
		body: json,
		json: true
	};
	let result = await request(options)
	.then(function(body) {
		return "OK";
	})
	.catch(function (err) {
        return "Error";
    });
	stateChangeHandler(result);
}

post_json("http://localhost:3000/api/finishSessionSetup", console.log, "../../example_data/placeholder_finishedSessionSetup.json");
