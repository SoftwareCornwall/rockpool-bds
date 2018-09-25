"use strict";

function createHTMLElement(args) {
    if (args.tag === undefined) {
        throw new Error("tag must be defined");
    }

    var element = document.createElement(args.tag);

    if (args.text !== undefined) {
        element.innerHTML = args.text;
    }

    if (args.attributes !== undefined) {
        for (let key in args.attributes) {
            element.setAttribute(key, args.attributes[key]);
        }
    }

    if (args.events !== undefined) {
        for (let key in args.events) {
            element.addEventListener(key, args.events[key]);
        }
    }

    if (args.parent === undefined) {
        document.getElementsByTagName("body")[0].appendChild(element);
    } else {
        args.parent.appendChild(element);
    }

    return element;
}

function postJSON(target, stateChangeHandler, json) {
    var data = JSON.stringify(json);
    var http = new XMLHttpRequest();

    const isAsync = true;
	var url = "http://10.160.50.176:3000" + target;
    http.open("POST", url, isAsync);

    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = (() => stateChangeHandler(http));
    http.send(data);
}

function getData(target, stateChangeHandler) {
    var http = new XMLHttpRequest();

	const isAsync = true;
	var url = "http://10.160.50.176:3000" + target;
    http.open("GET", url, isAsync);

    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = (() => stateChangeHandler(http));
    http.send();
}
