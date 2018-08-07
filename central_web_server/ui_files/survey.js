"use strict";

var speciesImageLocations = {
    1:  "./img/common.png",
    2:  "./img/special.png",
    3:  "./img/todd.png",
    4:  "./img/cat.png",
    5:  "./img/spycrab.png"
};

var listInfo = {};

var foundSpecies = [];

function postJSON(target, stateChangeHandler, json) {
    var data = JSON.stringify(json);
    var http = new XMLHttpRequest();

    const isAsync = true;
    http.open("POST", target, isAsync);

    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = (() => stateChangeHandler(http));
    http.send(data);
}

function logHttpStateChange(http) {
    var text = "POST Response: readyState = '" + http.readyState + "', status = '" + http.status + "', responseText = '" + http.responseText + "'.";
    console.log(text);
}

function submit_onClick() {
    var submitData = {
        "found_species": foundSpecies,
        "species_list_id": window.localStorage.getItem("speciesList"),
        "tourist_id": window.localStorage.getItem("touristIds").split(","),
        "session_id": window.localStorage.getItem("sessionId")
    };

    console.log(JSON.stringify(submitData));

    const postTarget = "http://10.24.1.69:3000" + "/api/submitSurveyResults";
    postJSON(postTarget, logHttpStateChange, submitData);
}

function species_onClick(id) {
    var isSelected = foundSpecies.includes(id);
    var newClass = "species";

    if (isSelected) {
        var i = foundSpecies.indexOf(id);
        if (i != -1) foundSpecies.splice(i, 1);
        // If foundSpecies contains this species, cut it out of the array.
    } else {
        newClass += " selectedSpecies";
        foundSpecies.push(id);
    }

    document.getElementById(id).setAttribute("class", newClass);
}

function loadSpecies(name, id, image, container) {    
    var species = createHTMLElement({
        tag: "div",
        parent: container,
        events: { "click": (() => species_onClick(id)) },
        attributes: {
            class: "species",
            id: id
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

function getChosenSpeciesList() {
    var lists = JSON.parse(localStorage.getItem("species"));
    var id = localStorage.getItem("speciesList");

    for (var i = 0; i < lists.length; i++) {
        if (lists[i].species_list_id == id) return lists[i].species;
    }
}

function initialise() {
    listInfo = getChosenSpeciesList();
    var container = document.getElementById("container");

    for (var i = 0; i < listInfo.length; i++) {
        var name = listInfo[i].name;
        var id = listInfo[i].id;
        var image = speciesImageLocations[id];

        loadSpecies(name, id, image, container);
    }

    document.getElementById("submit").addEventListener("click", submit_onClick);
}

window.onload = (() => initialise());
