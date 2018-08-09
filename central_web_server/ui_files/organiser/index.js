function footerButton_click() {
    var tideTime = document.getElementById("tide-time-input").value;
    var tideHeight = document.getElementById("tide-height-input").value;
    var location = document.getElementById("locations-list").value;
    
    if ((tideHeight.trim() == "") || isNaN(tideHeight)) {
        alert("Low Tide Height must be a valid number.");
        return;
    } else if ((tideHeight < -2.0) || (tideHeight > 10.0)) {
        alert("Low Tide Height must be within -2.0 and 10.0");
        return;
    }
    
    localStorage.setItem("tideTime", tideTime);
    localStorage.setItem("tideHeight", tideHeight);
    localStorage.setItem("location", location);
}

function handleLocationsFetch(http) {
    console.log(http);

    if ((http.readyState != http.DONE) || (http.status != 200)) {
        return;
    }
    
    var json = JSON.parse(http.responseText);
    console.log(json);
}

function initialise() {
    document.getElementById("footer-button").addEventListener("click", footerButton_click);
    
    getData("http://10.24.1.69:3000/api/getLocations", handleLocationsFetch);
}

window.onload = initialise;
