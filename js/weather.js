let latitude;
let longitude;
const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city");
const temperatureSection = document.querySelector("#temperature");
const conditionsSection = document.querySelector("#conditions");
const temperatureLink = document.querySelector("#temperature-link");
const conditionsLink = document.querySelector("#conditions-link");
const locationName = document.querySelector("#location-name");

function getWeatherDescription(code) {
  if (code === 0) {
    return "Clear sky";
  } else if (code === 1) {
    return "Mainly clear";
  } else if (code === 2) {
    return "Partly cloudy";
  } else if (code === 3) {
    return "Overcast";
  } else if (code === 45) {
    return "Fog";
  } else if (code === 51) {
    return "Light drizzle";
  } else if (code === 61) {
    return "Light rain";
  } else if (code === 63) {
    return "Moderate rain";
  } else if (code === 65) {
    return "Heavy rain";
  } else if (code === 71) {
    return "Light snow";
  } else if (code === 80) {
    return "Rain showers";
  } else if (code === 95) {
    return "Thunderstorm";
  } else {
    return "Unknown conditions";
  }
}

function getWeatherIcon(code) {
  if (code === 0) {
    return "☀️";
  } else if (code <= 3) {
    return "🌤️";
  } else if (code === 45) {
    return "🌫️";
  } else if (code >= 51 && code <= 65) {
    return "🌧️";
  } else if (code >= 71 && code <= 77) {
    return "❄️";
  } else if (code >= 80 && code <= 82) {
    return "🌦️";
  } else if (code >= 95) {
    return "⛈️";
  } else {
    return "🌤️";
  }
}

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value;
  const geocodingUrl =
  `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  fetch(geocodingUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        alert("City not found. Please try again.");
        return;
      }
       latitude = data.results[0].latitude;
       longitude = data.results[0].longitude;
       locationName.textContent = data.results[0].name;
       console.log(latitude);
       console.log(longitude);     
    })
    .catch((error) => {
      console.error(error);
      alert("Unable to get the city. Please try again.");
    });
});

temperatureLink.addEventListener("click", (event) => {
  event.preventDefault();
  if (!latitude || !longitude) {
    alert("Please search for a city first.");
    return;
  }

  const temperatureUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature&temperature_unit=fahrenheit`;

  fetch(temperatureUrl)
    .then((response) => response.json())
    .then((temperatureData) => {
      temperatureSection.innerHTML = `
        <h2>Temperature</h2>
        <p class="current-temp">${temperatureData.current.temperature_2m}°F</p>
        <p class="feels-like">
          Feels like ${temperatureData.current.apparent_temperature}°F
        </p>
    `;
    })
    .catch((error) => {
      console.error(error);
      alert("Unable to get temperature data. Please try again.");
    });
});

conditionsLink.addEventListener("click", (event) => {
  event.preventDefault();
  if (!latitude || !longitude) {
    alert("Please search for a city first.");
    return;
  }
  const conditionsUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,relative_humidity_2m,wind_speed_10m&wind_speed_unit=mph`;

  fetch(conditionsUrl)
    .then((response) => response.json())
    .then((conditionsData) => {
      const description =
        getWeatherDescription(conditionsData.current.weather_code);
      const icon =
        getWeatherIcon(conditionsData.current.weather_code);

        conditionsSection.innerHTML = `
          <h2>Conditions</h2>

          <div class="weather-icon">${icon}</div>
          <p class="condition-text">${description}</p>
      
          <div class="weather-stats">
           <div class="stat-card">
             <span class="stat-label">Humidity</span>
             <span class="stat-value">${conditionsData.current.relative_humidity_2m}%</span>
           </div>
      
           <div class="stat-card">
            <span class="stat-label">Wind</span>
            <span class="stat-value">${conditionsData.current.wind_speed_10m} mph</span>
           </div>
          </div>
      `;
    })
    .catch((error) => {
      console.error(error);
      alert("Unable to get weather conditions. Please try again.");
    });
});