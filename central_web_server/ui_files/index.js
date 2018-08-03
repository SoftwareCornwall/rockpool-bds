var species = [];
var foundSpecies = [];

function submit_onClick() {
	const postTarget = "/api/0";
	postData(postTarget, "found_species=" + foundSpecies.join(","));
}

function species_onClick(id) {
	var speciesName = species[id][0];
	var isSelected = foundSpecies.includes(speciesName);
	var newClass = "species";
	
	if (isSelected) {
		var i = foundSpecies.indexOf(speciesName);
		if (i != -1) foundSpecies.splice(i, 1);
		// If foundSpecies contains this species, cut it out of the array.
	} else {
		newClass += " selectedSpecies";
		foundSpecies.push(speciesName);
	}
	
	document.getElementById("species-" + id).setAttribute("class", newClass);
}

function getData(target, loadHandler) {
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("GET", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/json");
	http.addEventListener("load", () => loadHandler(http.responseText));
	http.send();
}

function postData(target, data) {
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("POST", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	http.onreadystatechange = function () {
		var text = "POST Response: readyState = '" + http.readyState + "', status = '" + http.status + "', responseText = '" + http.responseText + "'.";
		console.log(text);
	}
	
	http.send(data);
}
