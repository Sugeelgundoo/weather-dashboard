
const apiKey = '******** your apki kay*********';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const timeElement = document.getElementById('time');
const weatherIcon = document.getElementById('icon');


searchButton.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});


async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data');
    }
}


function displayWeatherData(data) {
    const weather = data.weather[0];
    const main = data.main;
    const city = data.name;
    
    cityName.textContent = `${city}`;
    temperature.textContent = `Temperature: ${main.temp} °C`;
    condition.textContent = `Condition: ${weather.description}`;
    timeElement.textContent = `Current Time: ${new Date().toLocaleTimeString()}`;

    const iconCode = weather.icon;
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon" />`;

    
    setWeatherBackground(weather.main);
    
   
    weatherInfo.style.display = 'block';
}

// Set background color based on weather condition
function setWeatherBackground(condition) {
    document.body.classList.remove('sunny', 'rainy', 'cloudy' ,'snow');
    
    if (condition === 'Clear') {
        document.body.classList.add('sunny');
    } else if (condition === 'Rain') {
        document.body.classList.add('rainy');
    } else if (condition === 'Clouds') {
        document.body.classList.add('cloudy');
    }
     else if(condition === 'snow'){
            document.body.classList.add('snow');
        }
    }
