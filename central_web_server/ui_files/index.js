"use strict";

var speciesList = [];

function getData(target, loadHandler) {
    var http = new XMLHttpRequest();

    const isAsync = true;
    http.open("GET", target, isAsync);

    http.setRequestHeader("Content-type", "application/json");
    http.addEventListener("load", () => loadHandler(http.responseText));
    http.send();
}

function handleSpeciesListDownload(result) {
    speciesList = JSON.parse(result);
    var list = document.getElementById("species-list-select");

    for (var i = 0; i < speciesList.length; i++) {
        createHTMLElement({
            tag: "option",
            parent: list,
            text: speciesList[i].species_list,
            attributes: { value: speciesList[i].species_list_id }
        });
    }
}

function isAlphanumeric(phrase) {
    const legalChars = "1234567890qwertyuiopasdfghjklzxcvbnm";
    phrase = phrase.toLowerCase();

    for (var i = 0;i < phrase.length; i++) {
        if (legalChars.indexOf(phrase[i]) == -1) {
            // char not found in legalChars.
            return false;
        }
    }

    return true;
}

function findInvalidField(sessionId, touristIds) {
    var isSessionIdValid = ((sessionId.length == 5) && isAlphanumeric(sessionId));
    if (!isSessionIdValid) {
        return "sessionId";
    }

    const maxTouristCount = 3;
    var isValidTouristCount = ((touristIds.length > 0) && (touristIds.length <= maxTouristCount));
    if (!isValidTouristCount)
        return "touristIds";


    for (var i = 0; i < touristIds.length; i++) {
        var isValid = ((touristIds[i].length == 5) && isAlphanumeric(touristIds[i]));
        if (!isValid) return "touristIds";
    }

    return "none";
}

function continueButton_click() {
    var sessionId = document.getElementById("session-id-input").value;
    var speciesListId = document.getElementById("species-list-select").value;

    var touristIds = [];
    const noOfTourists = 3;
    for (let i = 0; i < noOfTourists; i++) {
        var tourist = document.getElementById("tourist-input-" + i).value;
        if (tourist != "")
            touristIds.push(tourist);
    }

    var invalidField = findInvalidField(sessionId, touristIds);

    if (invalidField == "sessionId") {
        alert("Invalid Session ID");
        return;
    } else if (invalidField == "touristIds") {
        alert("Invalid Tourist IDs");
        return;
    }

    window.localStorage.setItem("sessionId", sessionId);
    window.localStorage.setItem("speciesList", speciesListId);
    window.localStorage.setItem("touristIds", touristIds);
    window.localStorage.setItem("species", JSON.stringify(speciesList));
    //TODO: only send required data.

    window.location = "./survey.html";
}

function initialise() {
    const speciesListsURL = "http://10.24.1.69:3000/api/getSpeciesLists";
    getData(speciesListsURL, (result) => handleSpeciesListDownload(result));
    document.getElementById("continue-button").addEventListener("click", continueButton_click);
    //handleSpeciesListDownload(JSON.stringify(speciesLists));
}

window.onload = initialise;
