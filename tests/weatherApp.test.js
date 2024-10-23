import { describe, it, expect, vi } from 'vitest';
import { WeatherApp } from './app';
import { fetchWeather } from './weatherApi';

vi.mock('./weatherApi'); 

describe('WeatherApp', () => {
    let app;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="weather-container"></div>
            <div id="history-list"></div>
            <input type="text" id="city-input" />
            <button id="search-btn">Search</button>
        `;
        app = new WeatherApp();
    });

    it('should fetch weather data and display it', async () => {
        const mockWeatherData = {
            name: 'London',
            sys: { country: 'GB' },
            main: { temp: 280.32 },
            weather: [{ icon: '01d' }],
        };

        fetchWeather.mockResolvedValueOnce(mockWeatherData);
        
        await app.handleSearch();

        expect(fetchWeather).toHaveBeenCalledWith('London');
        expect(document.getElementById('weather-container').innerHTML).toContain('London');
        expect(document.getElementById('weather-container').innerHTML).toContain('GB');
    });

    it('should handle errors and display an error message', async () => {
        fetchWeather.mockRejectedValueOnce(new Error('Weather data not found'));

        await app.handleSearch();

        expect(document.getElementById('weather-container').innerHTML).toContain('Error: Weather data not found');
    });

    it('should add a city to the history', async () => {
        const city = 'London';
        app.cityInput.value = city;

        await app.handleSearch();
        expect(app.searchHistory).toContain(city);
    });

    it('should update the history list', () => {
        app.addToHistory('London');
        app.updateHistoryList();

        expect(document.getElementById('history-list').innerHTML).toContain('London');
    });
});
