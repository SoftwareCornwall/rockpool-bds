function createHTMLElement(type, attributes) {
	var element = document.createElement(type);
	for (var i = 0; i < attributes.length; i++)
		element.setAttribute(attributes[i][0], attributes[i][1]);
	
	return element;
}

function loadSpecies(name, image, parent) {
	var speciesId = parent.children.length;
	
	var species = createHTMLElement("div", [
		["class", "species"],
		["id", "species-" + speciesId]
	]);
	species.addEventListener("click", () => species_onClick(speciesId));
	
	var span = createHTMLElement("span", []);
	var img = createHTMLElement("img", [["src", image]]);
	var text = document.createTextNode(name);
	
	span.appendChild(text);
	species.appendChild(span);
	species.appendChild(img);
	parent.appendChild(species);
}

function initialise() {
	var container = document.getElementById("container");
	
	for (var i = 0; i < species.length; i++) {
		loadSpecies(species[i][0], species[i][1], container);
	}
	
	document.getElementById("submit").addEventListener("click", () => submit_onClick());
}



window.onload = (() => initialise());
