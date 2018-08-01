function loadCrab(name, image, parent) {
	var html = '<div class="crab"><span>' + name + '</span><img src="./' + image + '.png"></div>';
	
	var crab = document.createElement("div");
	crab.setAttribute("class", "crab");
	
	var text = document.createTextNode(name);
	var span = document.createElement("span");
	var img = document.createElement("img");
	img.setAttribute("src", "./img/" + image + ".png");
	
	span.appendChild(text);
	crab.appendChild(span);
	crab.appendChild(img);
	parent.appendChild(crab);
}

window.onload = function () {
	var container = document.getElementById("container");
	
	loadCrab("Common Crab", "common", container);
	loadCrab("Special Crab", "special", container);
}
