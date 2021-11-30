let appId = '2a5cc3af57a0f47a0d85d5a5a7e2f7de';
let units = 'metric';
let searchMethod = 'zip';

function getSearchMethod(searchTerm) {
    if(searchTerm.lenght === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("./img/blue-sky.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("./img/clouds.jpg")';
            break;

        case 'Rain':
            document.body.style.backgroundImage = 'url("./img/road-bg.jpeg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./img/lighting-storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("./img/snow.jpeg")';
            break;

        case 'Drizzle':
            document.body.style.backgroundImage = 'url("")';
            break;

        case 'Mist':
            document.body.style.backgroundImage = 'url("")';
            break;
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
    searchWeather(searchTerm);
})