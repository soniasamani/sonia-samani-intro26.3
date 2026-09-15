let latitude;
let longitude;
const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city");
const temperatureSection = document.querySelector("#temperature");
const conditionsSection = document.querySelector("#conditions");
const temperatureLink = document.querySelector("#temperature-link");
const conditionsLink = document.querySelector("#conditions-link");
const locationName = document.querySelector("#location-name");
const currentTemp = document.querySelector("#current-temp");
const feelsLike = document.querySelector("#feels-like");

function getWeatherDescription(code) {
  if (code === 0) {
    return "Clear sky";
  } else if (code === 1) {
    return "Mainly clear";
  } else if (code === 2) {
    return "Partly cloudy";
  } else if (code === 3) {
    return "Overcast";
  } else if (code === 45 || code === 48) {
    return "Fog";
  } else if (code === 51 || code === 53 || code === 55) {
    return "Drizzle";
  } else if (code === 56 || code === 57) {
    return "Freezing drizzle";
  } else if (code === 61 || code === 63 || code === 65) {
    return "Rain";
  } else if (code === 66 || code === 67) {
    return "Freezing rain";
  } else if (code === 71 || code === 73 || code === 75) {
    return "Snow";
  } else if (code === 77) {
    return "Snow grains";
  } else if (code === 80 || code === 81 || code === 82) {
    return "Rain showers";
  } else if (code === 85 || code === 86) {
    return "Snow showers";
  } else if (code === 95) {
    return "Thunderstorm";
  } else if (code === 96 || code === 99) {
    return "Thunderstorm with hail";
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

  const city = cityInput.value.trim();
  const geocodingUrl =
  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  fetch(geocodingUrl)
    .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to get city data.");
    }

    return response.json();
    })
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        alert("City not found. Please try again.");
        return;
      }
       latitude = data.results[0].latitude;
       longitude = data.results[0].longitude;
       locationName.textContent = data.results[0].name;     
    })
    .catch((error) => {
      console.error(error);
      alert("Unable to get the city. Please try again.");
    });
});

temperatureLink.addEventListener("click", (event) => {
  event.preventDefault();
  if (latitude == null || longitude == null) {
    alert("Please search for a city first.");
    return;
  }

  const temperatureUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature&temperature_unit=fahrenheit`;

  fetch(temperatureUrl)
    .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to get temperature data.");
    }

    return response.json();
    })
    .then((temperatureData) => {
      currentTemp.textContent = `${temperatureData.current.temperature_2m}°F`;

      feelsLike.textContent = `Feels like ${temperatureData.current.apparent_temperature}°F`;
    })
    .catch((error) => {
      console.error(error);
      alert("Unable to get temperature data. Please try again.");
    });
});

conditionsLink.addEventListener("click", (event) => {
  event.preventDefault();
  if (latitude == null || longitude == null) {
    alert("Please search for a city first.");
    return;
  }
  const conditionsUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,relative_humidity_2m,wind_speed_10m&wind_speed_unit=mph`;

  fetch(conditionsUrl)
    .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to get temperature data.");
    }

    return response.json();
    })
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