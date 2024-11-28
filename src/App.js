import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Optional: Use this for styling if you have a CSS file.

const App = () => {
    const [city, setCity] = useState("Toronto");
    const [weatherData, setWeatherData] = useState(null);

    // Function to fetch weather data
    const fetchWeather = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Fetch weather data when the component loads or when the city changes
    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    // Handle city search
    const handleSearch = (e) => {
        e.preventDefault();
        const inputCity = e.target.city.value.trim();
        if (inputCity) {
            setCity(inputCity);
        }
    };

    return (
        <div className="app">
            <h1>Weather App</h1>
            <form onSubmit={handleSearch}>
                <input
                    name="city"
                    placeholder="Enter city name"
                    autoComplete="off"
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.weather[0].description}</p>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Feels like: {weatherData.main.feels_like} °C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather Icon"
                    />
                </div>
            )}
        </div>
    );
};

export default App;
