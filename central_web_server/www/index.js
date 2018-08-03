var species = [];
var foundSpecies = [];

function logHttpStateChange(http) {
		var text = "POST Response: readyState = '" + http.readyState + "', status = '" + http.status + "'.";
		console.log(text);
}

function submit_onClick() {
	const postTarget = "/api/0";
	postData(postTarget, logHttpStateChange, "found_species=" + foundSpecies.join(","));
}

function species_onClick(id) {
	var speciesName = species[id].name;
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

function loadSpecies(name, image, container) {
	var speciesId = container.children.length;
	
	var species = createHTMLElement({
		tag: "div",
		parent: container,
		events: {
			"click": (() => species_onClick(speciesId))
		},
		attributes: {
			class: "species",
			id: "species-" + speciesId
		}
	});
	
	createHTMLElement({
		tag: "span",
		parent: species,
		text: name
	});
	
	createHTMLElement({
		tag: "img",
		parent: species,
		attributes: { src: image }
	});
}

function loadAllSpeciesFromJSONString(speciesString) {
	species = JSON.parse(speciesString);
	
	var container = document.getElementById("container");
	
	for (var i = 0; i < species.length; i++) {
		loadSpecies(species[i].name, species[i].image, container);
	}
}

function initialise() {	
	getData("./species.json", loadAllSpeciesFromJSONString);
	document.getElementById("submit").addEventListener("click", () => submit_onClick());
}

window.onload = (() => initialise());
