window.addEventListener("load", function() {

    // const document = window.document
    let form = document.querySelector("form");
    let pilot = document.querySelector("input[name=pilotName]");
    let copilot = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoLevel = document.querySelector("input[name=cargoMass]");
    const list = document.getElementById("faultyItems");
    let h2 = document.getElementById("launchStatus");
    

    list.style.visibility = "hidden";
    
    form.addEventListener("submit", function(event){   
        event.preventDefault();
        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value);
                
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = fetch("https://handlers.education.launchcode.org/static/planets.json");
    listedPlanetsResponse.then(function (response) {
        return response.json(); 
    }).then(function(result) {
        listedPlanets = result;
        // console.log(listedPlanets);
    }).then(function () {
        // console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        let selectedPlanet = pickPlanet(listedPlanets);
        // console.log(pickPlanet)

        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);  
    })

});
