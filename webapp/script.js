var foundSpecies = []

var species = [
	["Common Crab", "./img/common.png"],
	["Special Crab", "./img/special.png"],
	["Big Crab", "./img/common.png"],
	["Small Crab", "./img/special.png"],
	["Strange Crab", "./img/common.png"],
	["Final Crab", "./img/common.png"],
	["Wayward Crab", "./img/special.png"],
	["Unruly Crab", "./img/special.png"],
	["Heretic's Crab", "./img/common.png"]
]

function submit_onClick() {
	postData("/submit.php", "species=" + foundSpecies.join(","));
}

function species_onClick(id) {
	var speciesName = species[id][0];
	var isSelected = foundSpecies.includes(speciesName);
	var newClass = "species";
	
	if (isSelected) {
		var i = foundSpecies.indexOf(speciesName);
		if (i > -1) foundSpecies.splice(i, 1);
	} else {
		newClass += " selectedSpecies";
		foundSpecies.push(speciesName);
	}
	
	document.getElementById("species-" + id).setAttribute("class", newClass);
}

function postData(target, data) {
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("POST", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	http.onreadystatechange = function () {
		if(http.readyState == 4 && http.status == 200) {
			console.log(http.responseText);	
		}
	}
	
	http.send(data);
}
