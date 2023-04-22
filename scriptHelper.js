// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    missiontarget = document.getElementById("missionTarget");
    missiontarget.innerHTML = `
    <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
    <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return "Empty";
    } else if ((!isNaN(Number(testInput)))) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let h2 = document.getElementById("launchStatus");
   
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert(`All fields are required!`);
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert(`Make sure to enter valid information for each field!`);
    } else if (validateInput(cargoLevel) === "Not a Number" || validateInput(fuelLevel) === "Not a Number") {
        alert(`Make sure to enter valid information for each field!`);
    } else {
        list.style.visibility = "hidden";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        
    }
    

    //cargo too high, fuel too low
     if(fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            h2.innerHTML = 'Shuttle Not Ready for Launch';
            h2.style.color = "rgb(199, 37, 78)";
            list.style.visibility = "visible";
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    //fuel too low, cargo enough    
    } else if (fuelLevel < 10000 && cargoLevel <= 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        h2.innerHTML = 'Shuttle Not Ready for Launch';
        h2.style.color = 'rgb(199, 37, 78)';
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    //cargo too high, fuel enough
    } else if (cargoLevel > 10000 && fuelLevel <= 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        h2.innerHTML = "Shuttle Not Ready for Launch";
        h2.style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        
    //enough fuel and cargo    
    } else if (cargoLevel <= 10000 && fuelLevel <=10000) {
        h2.innerHTML = "Shuttle is Ready for Launch";
        list.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level high enough for launch";
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
        h2.innerHTML = "Shuttle is Ready for Launch";
        h2.style.color = "rgb(65, 159, 106)";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) { 
        return(response.json())
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
