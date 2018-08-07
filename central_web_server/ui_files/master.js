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

function getData(target, loadHandler) {
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("GET", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/json");
	http.addEventListener("load", () => loadHandler(http.responseText));
	http.send();
}

function postJSON(target, stateChangeHandler, json) {
	var data = JSON.stringify(json);
	var http = new XMLHttpRequest();
	
	const isAsync = true;
	http.open("POST", target, isAsync);
	
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = (() => stateChangeHandler(http));
	http.send(data);
}
