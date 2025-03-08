document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.querySelector(".input-box");
    const searchButton = document.querySelector("button");
    const container = document.querySelector(".container");

    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info";
    weatherInfo.style.color = "#ffffff"; 
    container.appendChild(weatherInfo);

    searchButton.addEventListener("click", () => {
        const city = inputBox.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        const apiKey = "b6f313027889287fde7407027c1a624e";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherInfo.innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        
        weatherInfo.innerHTML = `
            <h3>${name}</h3>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${description}</p>
        `;
    }
});
