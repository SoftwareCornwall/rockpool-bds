function createHTMLElement(args) {
	if (args.tag == undefined) {
		throw new Error("tag must be defined");
	}
	
	var element = document.createElement(args.tag);
	
	if (args.text != undefined)
		element.innerHTML = args.text;
	
	if (args.attributes != undefined) {
		for (var key in args.attributes) {
			element.setAttribute(key, args.attributes[key]);
		}
	}
	
	if (args.events != undefined) {
		for (var key in args.events) {
			element.addEventListener(key, args.events[key]);
		}
	}
	
	if (args.parent == undefined) {
		document.getElementsByTagName("body")[0].appendChild(element);
	} else {
		args.parent.appendChild(element);
	}
	
	return element;
}

function loadSpecies(name, image, container) {
	var speciesId = container.children.length;
	
	var species = createHTMLElement({
		tag: "div",
		parent: container,
		events: { "click": (() => species_onClick(speciesId)) },
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
		loadSpecies(species[i][0], species[i][1], container);
	}
}

function initialise() {	
	getData("./species.json", loadAllSpeciesFromJSONString);
	document.getElementById("submit").addEventListener("click", () => submit_onClick());
}

window.onload = (() => initialise());
