/**
 * WetterApp
 * © 2024 Jojo252511
 * GitHub: https://github.com/Jojo252511
 * 
 * Version: 1.0.0
 * 
 * --------------------------------------
 * 
 * Open Weather API
 * Link: openweathermap.org
 * 
 * Wetter Symbole
 * Link: fontawesome.com 
*/


// API-KEY aus Datei holen
import apiKey from './config.js';

getURL();
// Tasten Event "Enter" für den Input
document.getElementById('cityInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Tasten Event "Click" für den Button
document.getElementById('weatherButton').addEventListener('click', function () {
    getWeather();
});

// Funktion, um Wetterdaten abzurufen
async function loadWeather(city) {
    toggleLoadingBox();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
        errorMessage();
    }
}

// Funktion, um Userinput zu verarbeiten und laden der Wetterinformationen zu starten
function getWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (city) {
        changeURL(city);
    } else {
        console.log("Ungültige Eingabe")
    }
}

// Funktion, um dem Nutzer die Rückmeldung darüber zu geben das die eingegebene Stadt nicht gefunden wurde
function errorMessage() {
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = 'Stadt nicht gefunden. Bitte versuche es erneut.';
    displayWeatherMain();

    setTimeout(() => {
        toggleLoadingBox();
    }, 1500);
}

// Funktion, um den Stadt Parameter in der URL zu hinterlegen
function changeURL(city) {
    let currentUrl = window.location.href;
    let newUrl = new URL(currentUrl);
    newUrl.searchParams.set('location', city);
    window.location.href = newUrl;
}

// Funktion, um den Stadt Parameter aus der URL zu holen
function getURL() {
    let currentUrl = window.location.href;
    let url = new URL(currentUrl);

    if (url.searchParams.has('location')) {
        // Wert des Parameters `location` speichern
        let city = url.searchParams.get('location');
        loadWeather(city);
    } else {
        toggleStartInfo(true);
    }
}

// Funktion, um die Wetterdaten anzuzeigen
function displayWeather(data) {
    const description = data.weather[0].description;

    if (data.cod === 200) {
        setAllData(data);
        WeatherIcon(description);
        toggleStartInfo(false);
        displayWeatherMain();
        setTimeout(() => {
            toggleLoadingBox();
        }, 1500);
    } else {
        weatherDiv.innerHTML = 'Stadt nicht gefunden. Bitte versuche es erneut.';
        displayWeatherMain();
        setTimeout(() => {
            toggleLoadingBox();
        }, 2000);
    }
}

// Funktion, die alle Funktionen zum anzeigen der Wetterdaten aufruft
function setAllData(data) {
    setInfo(data);
    setTemp(data);
    setWind(data);
    setAir(data);
    setSunInfo(data);
}

// Funktion die alle Wetterboxen sichtbar macht
function displayWeatherMain() {
    const weatherMain = document.getElementById('weather-main');
    weatherMain.style.display = 'flex';
}

// Funktion, die die Start info einblendet/ausblendet 
function toggleStartInfo(status) {
    const startInfo = document.getElementById('start-info');

    if (status) {
        startInfo.style.display = 'flex';
    } else {
        startInfo.style.display = 'none';
    }
}

// Funktion, welche die sichtbarkeit der Ladebox steuret
function toggleLoadingBox() {
    const loadingBox = document.getElementById('loading');

    if (loadingBox.style.display == 'none') {
        loadingBox.style.display = 'flex';
    } else {
        loadingBox.style.display = 'none';
    }
}

// Funktion, zum zuordnen von Wettersymbole basierend auf der Beschreibung
function WeatherIcon(description) {
    const weatherIcon = document.querySelector('#pic i');
    const des = description.toLowerCase();

    if (des.includes('klar')) {weatherIcon.className = 'fas fa-sun';} else if (des.includes('regen')) {weatherIcon.className = 'fas fa-cloud-showers-heavy';} else if (des.includes('wolken')) {weatherIcon.className = 'fas fa-cloud';} else if (des.includes('bewölkt')) {weatherIcon.className = 'fas fa-cloud';} else if (des.includes('bedeckt')) {weatherIcon.className = 'fas fa-cloud';} else if (des.includes('schnee')) {weatherIcon.className = 'fas fa-snowflake';} else if (des.includes('nebel')) {weatherIcon.className = 'fa-solid fa-smog';} else if (des.includes('gewitter')) {weatherIcon.className = 'fas fa-cloud-bolt';} else if (des.includes('wind')) {weatherIcon.className = 'fas fa-wind';} else if (des.includes('regentropfen')) {weatherIcon.className = 'fas fa-tint';} else if (des.includes('mond')) {weatherIcon.className = 'fas fa-moon';} else if (des.includes('sternenhimmel')) {weatherIcon.className = 'fas fa-moon-stars';} 
    else {
        weatherIcon.className = 'fa-solid fa-cloud-sun-rain'; // bei unbekannter Beschreibung
    }
}

// Funktion, um die Zeit passend zu vormatieren (hh:mm)
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

function formatTimeZone(timestamp, timezoneOffset) {
    // Datum und Uhrzeit in der lokalen Zeitzone
    const localDate = new Date((timestamp + timezoneOffset) * 1000);
    
    return formatTime(localDate);
}

// ---------------------------------------------------------------------------------Set-------------------------------------------------------------------------------------

function setInfo(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const weatherDiv = document.getElementById('weather');
    const ort = document.getElementById('ort');
    const temperatur = document.getElementById('temperatur');
    weatherDiv.innerHTML = `<i class="fa-solid fa-globe"></i><br><br>Das Wetter in ${city}: <br>${description} bei ${temp}°C.`;
    ort.innerHTML = `<h2>${city}:</h2>`;
    temperatur.innerHTML = `<h2>${temp}°C</h2>`;
}

function setTemp(data) {
    const temp = data.main.temp;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const tempBox = document.getElementById('tempBox');
    tempBox.innerHTML = `<i class="fa-solid fa-temperature-low"></i><br><br>Temperatur: ${temp}°C<br> Min/Max: ${tempMin}°C/${tempMax}°C`;

}

function setWind(data) {
    const windSpeed = data.wind.speed;
    const windBox = document.getElementById('windBox');
    windBox.innerHTML = `<i class="fa-solid fa-wind"></i><br><br>Windstärke: ${windSpeed} km/h`;
}

function setAir(data) {
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const airBox = document.getElementById('airBox');
    airBox.innerHTML = `<i class="fa-solid fa-temperature-quarter"></i><br><br>Luftdruck: ${pressure} hPa<br>Luftfeuchtigkeit: ${humidity}%`;
}

function setSunInfo(data) {
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);

    const sunInfo = document.getElementById('sunInfo');
    sunInfo.innerHTML = `<i class="fa-regular fa-sun"></i><br><br>Sonnenaufgang: ${formatTime(sunriseDate)} Uhr<br></i>Sonnenuntergang: ${formatTime(sunsetDate)} Uhr`;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
