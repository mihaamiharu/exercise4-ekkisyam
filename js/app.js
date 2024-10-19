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
        // TODO: Add event listeners
        // TODO: Check for city in URL parameters
    }

    handleSearch() {
        // TODO: Implement search functionality
    }

    displayWeather(data) {
        // TODO: Display weather data
    }

    addToHistory(city) {
        // TODO: Add city to search history
    }

    updateHistoryList() {
        // TODO: Update the history list in the UI
    }

    handleHistoryClick(e) {
        // TODO: Handle clicks on history items
    }

    updateURL(city) {
        // TODO: Update URL with the searched city
    }
}

const app = new WeatherApp();