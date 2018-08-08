var fs = require('fs');

var post_json = function (target, stateChangeHandler, json) {
	let data = fs.readFileSync(json);
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("POST", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = (() => stateChangeHandler(http));
	http.send(data);
}

post_json("/api/finishSessionSetup", console.log, "placeholder_finishedSessionSetup.json")
