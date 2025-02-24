const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
//const API_URL = "https://fim.api.us.fleetmatics.com:443/geo/v1";
const API_KEY = "APIKEY";  // Replace with API key




//API CALL FUNCTIONS

async function fetchData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        document.getElementById("data-container").innerHTML = 
            `Bitcoin Price: $${data.bitcoin.usd}`;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function switchCamera(cameraId) {
    document.getElementById("camera-feed").innerText = "Camera " + cameraId + " Feed";
}


async function fetchFleetData() {
    try {
        let response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}` // Adjust if using Basic Auth
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        displayFleetData(data);
    } catch (error) {
        console.error("Error fetching fleet data:", error);
        document.getElementById("data-container").innerHTML = "Error fetching data.";
    }
}

function displayFleetData(data) {
    let container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous data

    data.vehicles.forEach(vehicle => {
        let vehicleInfo = document.createElement("div");
        vehicleInfo.classList.add("fleet-item");
        vehicleInfo.innerHTML = `
            <strong>${vehicle.name}</strong><br>
            Location: ${vehicle.location.lat}, ${vehicle.location.lng} <br>
            Speed: ${vehicle.speed} mph
        `;
        container.appendChild(vehicleInfo);
    });
}

async function fetchBatteryData() {
    try {
        // Simulate API response with a random battery percentage
        let batteryData = {
            percentage: Math.floor(Math.random() * 101) // Random 0-100%
        };

        // Display the battery data
        displayBatteryData(batteryData);
    } catch (error) {
        console.error("Error fetching battery data:", error);
        document.getElementById("battery-container").innerHTML = "Error fetching data.";
    }
}

function displayBatteryData(data) {
    let container = document.getElementById("battery-container");
    container.innerHTML = `Battery Level: ${data.percentage}%`;

    // Change color based on battery level
    if (data.percentage > 50) {
        container.style.color = "green";
    } else if (data.percentage > 20) {
        container.style.color = "orange";
    } else {
        container.style.color = "red";
    }
}



document.addEventListener("DOMContentLoaded", () => {
    // Initialize map in the bottom-right box
    let map = L.map('map').setView([45.0000, -93.0000], 10); // Default to New York

    // Load and display tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a mock vehicle marker
    let vehicleMarker = L.marker([45.0000, -93.0000]).addTo(map)
        .bindPopup("Vehicle Location")
        .openPopup();

    // Function to update vehicle location (Mocked)
    function updateVehicleLocation() {
        let newLat = 45.0000 + (Math.random() - 0.5) * 0.1;
        let newLng = -93.0000 + (Math.random() - 0.5) * 0.1;
        vehicleMarker.setLatLng([newLat, newLng])
            .bindPopup(`Updated Location: ${newLat.toFixed(5)}, ${newLng.toFixed(5)}`)
            .openPopup();
    }

    // Update location every 5 seconds (Mock GPS movement)
    setInterval(updateVehicleLocation, 5000);
});




// Fetch mock battery data every 5 seconds
fetchBatteryData();
setInterval(fetchBatteryData, 5000);


// Fetch data every 5 seconds
fetchData();
setInterval(fetchData, 5000);
