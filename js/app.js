import { fetchWeather } from './weatherApi.js';

class WeatherApp {
    constructor() {
        this.searchBtn = document.getElementById('search-btn');
        this.cityInput = document.getElementById('city-input');
        this.weatherContainer = document.getElementById('weather-container');
        this.historyList = document.getElementById('history-list');
        this.searchHistory = [];

        this.init();
    }

    init() {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.updateHistoryList();
        this.searchBtn.addEventListener('click', this.handleSearch.bind(this));

        this.cityInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const city = this.cityInput.value.trim();
        if (city) {
            fetchWeather(city)
                .then(data => {
                    if (data.cod !== '404') {
                        this.displayWeather(data);
                        this.addToHistory(city);
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch(error => {
                    alert(`Error: ${error.message}`);
                });
        }
    }

    displayWeather(data) {
        this.weatherContainer.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
        `;
    }

    addToHistory(city) {
        if (!this.searchHistory.includes(city)) {
            this.searchHistory.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            this.updateHistoryList();
        }
    }

    updateHistoryList() {
        this.historyList.innerHTML = '';
        this.searchHistory.forEach(city => {
            const listItem = document.createElement('li');
            listItem.textContent = city;
            listItem.addEventListener('click', this.handleHistoryClick.bind(this));
            this.historyList.appendChild(listItem);
        });
    }

    handleHistoryClick(e) {
        const city = e.target.textContent;
        this.cityInput.value = city;
        this.handleSearch();
    }

    updateURL(city) {
        window.history.pushState({}, '', `?city=${city}`);
    }
}

const app = new WeatherApp();