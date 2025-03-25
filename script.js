const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
//const API_URL = "https://fim.api.us.fleetmatics.com:443/geo/v1";
const API_KEY = "APIKEY";  // Replace with API key





const cameraGifs = {
    1: "assets/front.gif",
    2: "assets/right.gif",
    3: "assets/left.gif",
    4: "assets/rear.gif"
};



function switchCamera(cameraId) {
    document.getElementById("camera-feed").src = cameraGifs[cameraId];
}

// Set initial blank state (black block)
document.addEventListener("DOMContentLoaded", () => {
    let cameraFeed = document.getElementById("camera-feed");
    cameraFeed.style.width = "330px";
    cameraFeed.style.height = "200px";
    cameraFeed.style.backgroundColor = "black";
    
    // Switch to the first camera after 2 seconds
    setTimeout(() => {
        switchCamera(1);
    }, 3000);
});

function switchCamera(cameraId) {
    document.getElementById("camera-feed").src = cameraGifs[cameraId];
}





document.querySelectorAll('.cdp-row').forEach(row => {
    row.addEventListener('click', function () {
        // Remove 'selected' from all rows
        document.querySelectorAll('.cdp-row').forEach(r => r.classList.remove('selected'));
        
        // Add 'selected' to clicked row
        this.classList.add('selected');
    });
});















let selectedCDP = null;
let selectedTA1 = null;
let cp1 = null;
let cp2 = null;
let important = null;

let cell_con = null; 
let signal_c = null;
let status_c = null;

let sat_con = null; 
let signal_s = null;
let status_s = null;


let power_batt = null;
let power_rng = null; 
let power_chrg = null;
let power_hlth = null;
let power_tmp = null; 
let power_re = null;
let prac_nts = null;

let mtr_hlth = null;
let intr_tmp = null; 
let bat_hlth = null;
let int_hum = null;

let cur_loc = null;
let gps_lat = 38.5733;
let gps_lon = -109.55;




document.querySelectorAll('.cdp-row').forEach(row => {
    row.addEventListener('click', function () {
        // Remove 'selected' from all rows
        document.querySelectorAll('.cdp-row').forEach(r => r.classList.remove('selected'));

        // Add 'selected' to clicked row
        this.classList.add('selected');

        // Get the selected CDP ID
        selectedCDP = this.getAttribute('data-cdp-id');
        selectedTA1 = this.getAttribute('data-cdp-ta1');
        cp1 = this.getAttribute('data-cdp-cp1');
        cp2 = this.getAttribute('data-cdp-cp2');
        important = this.getAttribute('data-cdp-important');

        cell_con = this.getAttribute('data-cdp-cell-con');
        signal_c = this.getAttribute('data-cdp-signal-c');
        status_c = this.getAttribute('data-cdp-status-c');
        sat_con = this.getAttribute('data-cdp-sat-con');
        signal_s = this.getAttribute('data-cdp-signal-s');
        status_s = this.getAttribute('data-cdp-status-s');

        // power_batt = this.getAttribute('data-cdp-pwr-bat');
        power_rng  = this.getAttribute('data-cdp-pwr-rng');
        power_chrg = this.getAttribute('data-cdp-pwr-chrg');
        power_hlth = this.getAttribute('data-cdp-pwr-hlth');
        power_tmp  = this.getAttribute('data-cdp-pwr-tmp');
        power_re   = this.getAttribute('data-cdp-pwr-re');
        prac_nts   = this.getAttribute('data-cdp-prc-nots');


        mtr_hlth = this.getAttribute('data-cdp-op-mtr');
        intr_tmp = this.getAttribute('data-cdp-op-tmp');
        bat_hlth = this.getAttribute('data-cdp-op-hlth');
        int_hum  = this.getAttribute('data-cdp-op-hum');


        cur_loc  = this.getAttribute('data-cdp-cur-loc');
        gps_lat  = this.getAttribute('data-cdp-cur-lat');
        gps_lon  = this.getAttribute('data-cdp-cur-lon');

 


        document.getElementById('selected-cdp').innerText = `CDP #${selectedCDP}`;
        document.getElementById('selected-ta1').innerText = `${selectedTA1}`;
        document.getElementById('selected-cp1').innerText = `${cp1}`;
        document.getElementById('selected-cp2').innerText = `${cp2}`;
        document.getElementById('selected-important').innerText = `${important}`;

        // Cell & SAT data
        document.getElementById('cellular-connectivity').innerText = `${cell_con}`;
        document.getElementById('cellular-signal').innerText = `${signal_c}`;
        document.getElementById('cellular-status').innerText = `${status_c}`;
        document.getElementById('sattelite-connectivity').innerText = `${sat_con}`;
        document.getElementById('sattelite-signal').innerText = `${signal_s}`;
        document.getElementById('sattelite-status').innerText = `${status_s}`;


        // Power Stats data
        // document.getElementById('power-battery').innerText = `${power_batt}`;
        document.getElementById('power-range').innerText = `Range: ${power_rng}`;
        document.getElementById('power-charge').innerText = `Charge: ${power_chrg}`;
        document.getElementById('power-health').innerText = `Health: ${power_hlth}`;
        document.getElementById('power-temp').innerText = `Temp: ${power_tmp}`;
        document.getElementById('power-remain').innerText = `Re: ${power_re}`;
        document.getElementById('prac-notes').innerText = `${prac_nts}`;

        // O&M
        document.getElementById('motor-health').innerText = `Motor:${mtr_hlth}✅`;
        document.getElementById('internal-temp').innerText = `Internal Temp:${intr_tmp}🌡️`;
        document.getElementById('battery-health').innerText = `Battery:${bat_hlth}⚡`;
        document.getElementById('internal-humid').innerText = `Humidity:${int_hum}💧`;
        
        // MAP
        document.getElementById('current-location').innerText = ` ${cur_loc}`;
        document.getElementById('current-lat').innerText = ` ${gps_lat}`;
        document.getElementById('current-lon').innerText = ` ${gps_lon}`;


        
    let firstRow = document.querySelector('.cdp-row');
    if (firstRow) {
        selectCDP(firstRow);
    }

        // Call function to update API or other UI elements
        updateAPI(selectedCDP);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    let firstRow = document.querySelector('.cdp-row');
    
    if (firstRow) {
        firstRow.click(); // Simulate click to trigger the event listener
    }
});












function updateAPI(cdpId) {
    console.log(`Fetching data for CDP #${cdpId}...`);

    // Example: Make an API call (replace with your actual API endpoint)
    fetch(`https://api.example.com/cdp/${cdpId}`)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);
            // Update your UI with API response data
        })
        .catch(error => console.error("API Error:", error));

    }

    

    





    let temperature = document.querySelector(".temp");
    let summary = document.querySelector(".summary");
    let loc = document.querySelector(".location");
    let humidity = document.querySelector(".humidity");
    let windSpeed = document.querySelector(".wind-speed");
    let windDirection = document.querySelector(".wind-direction");
    let rainVolume = document.querySelector(".rain");
    
    function fetchWeather(lat, lon) {
        const apiKey = "6d055e39ee237af35ca066f35474e9df";
    
        // API URL
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
        // Fetch weather data
        fetch(base)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
    
                // Convert temperature to Fahrenheit
                const tempFahrenheit = Math.floor((data.main.temp - 273.15) * 9/5 + 32);
    
                // Wind direction in compass format
                function getWindDirection(degrees) {
                    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
                    return directions[Math.round(degrees / 45) % 8];
                }
    
                // Get rain volume (last 1 hour) or set to 0 if undefined
                const rain1h = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
    
                // Update UI
                temperature.textContent = `Temperature: ${tempFahrenheit}°F`;
                summary.textContent = `Condition: ${data.weather[0].description}`;
                windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                windDirection.textContent = `Wind Direction: ${getWindDirection(data.wind.deg)} (${data.wind.deg}°)`;
                rainVolume.textContent = `Rain (last hour):  ${rain1h} %`;
            })
            .catch((error) => console.error("Error fetching weather data:", error));
    }
    document.querySelectorAll('.cdp-row').forEach(row => {
        row.addEventListener('click', function () {
             lon = gps_lon;
         lat = gps_lat;
        fetchWeather(lat, lon);
    });
});




let apiKey = "5b3ce3597851110001cf62487c72115a366d4df3a458833ad4dccb34";
let map = L.map('map').setView([39.8283, -98.5795], 4); // Center of the US

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let routeLayer;
let selectedStart = null;

// Array of CDP markers
let markerData = [
    { lat: 38.5733, lon: -109.55, name: "CDP #1" },
    { lat: 44.3367, lon: -85.2095, name: "CDP #2" },
    { lat: 35.1493, lon: -81.8632, name: "CDP #3" },
    { lat: 38.9241, lon: -111.2496, name: "CDP #4" },
    { lat: 34.8332, lon: -81.9929, name: "CDP #5" },
    { lat: 46.6508, lon: -93.0335, name: "CDP #6" }
];

// Add CDP markers to map
markerData.forEach(data => {
    let marker = L.marker([data.lat, data.lon]).addTo(map)
        .bindPopup(`${data.name} <br> <button onclick="setStart(${data.lat}, ${data.lon})">Select as Start</button>`);
});

// Function to set selected start point
function setStart(lat, lon) {
    selectedStart = [lat, lon];
    // alert(`Selected starting point: ${lat.toFixed(5)}, ${lon.toFixed(5)}`);
}

// Function to search for a route
async function searchRoute() {
    let endInput = document.getElementById("end").value;

    if (!selectedStart) {
        alert("Please select a starting point.");
        return;
    }

    try {
        let endCoords = await getCoordinates(endInput);

        if (!endCoords) {
            alert("Could not find location. Try entering a valid city or coordinates.");
            return;
        }

        fetchRoute(selectedStart, endCoords);
    } catch (error) {
        console.error("Error getting route:", error);
        alert("Error finding route. Try again.");
    }
}

// Function to fetch route
function fetchRoute(start, end) {
    let request = new XMLHttpRequest();
    request.open('POST', "https://api.openrouteservice.org/v2/directions/driving-car");
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', apiKey);

    request.onreadystatechange = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            if (data.routes && data.routes.length > 0) {
                let route = data.routes[0];

                document.getElementById("distance").innerText = ((route.summary.distance / 1000) * 0.621371).toFixed(2) + " mi";
                            document.getElementById("duration").innerText = (route.summary.duration / 60).toFixed(2) + " min";
                document.getElementById("traffic").innerText = "N/A (No Live Traffic)";

                drawRoute(route.geometry);
            } else {
                alert("No route found.");
            }
        }
    };

    const body = JSON.stringify({ coordinates: [[start[1], start[0]], [end[1], end[0]]] });
    request.send(body);
}

// Function to draw route
function drawRoute(encodedGeometry) {
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }

    let decodedCoords = decodePolyline(encodedGeometry);
    routeLayer = L.polyline(decodedCoords, { color: 'blue', weight: 5 }).addTo(map);
    map.fitBounds(routeLayer.getBounds());
}

// Function to decode polyline
function decodePolyline(str) {
    let index = 0, lat = 0, lng = 0, coordinates = [];
    while (index < str.length) {
        let b, shift = 0, result = 0;
        do {
            b = str.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = str.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }
    return coordinates;
}

// Function to get coordinates from location input
async function getCoordinates(location) {
    if (location.includes(",")) {
        let parts = location.split(",").map(x => parseFloat(x.trim()));
        return (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) ? parts.reverse() : null;
    }

    let url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(location)}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.features && data.features.length > 0) {
        let [lng, lat] = data.features[0].geometry.coordinates;
        return [lat, lng];
    }

    return null;
}


document.getElementById("resetBtn").addEventListener("click", resetMap);

function resetMap() {
    // Reset the map view to the original center and zoom level
    map.setView([39.8283, -98.5795], 4); 

    // Remove the route layer if it exists
    if (routeLayer) {
        map.removeLayer(routeLayer);
        routeLayer = null;
    }

    // Optionally clear other dynamically added markers
}
