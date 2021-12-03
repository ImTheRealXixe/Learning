
document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) { 
      weatherApi.getSearchMethod(searchTerm) 
    };

});

class weatherApi {

    constructor() {}

    static getSearchMethod (searchTerm) {
        if (searchTerm.lenght === 5 && Number.parseInt(searchTerm) + "" === searchTerm) {
            weatherApi.getCurrentWeather("zip", searchTerm);
        } else {
            weatherApi.getCurrentWeather("q", searchTerm);
        }
    }

    static getCurrentWeather(searchMethod, searchTerm, units = 'metric', appId = '2a5cc3af57a0f47a0d85d5a5a7e2f7de') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
            .then(response => {
                return response.json();
            })
            .then(response => {
                new weatherBox(this.gatherWeatherData(response), document.getElementById("weatherContainer"));
            })
            .catch(err => {
                console.log(err)
            })
    }

    static gatherWeatherData(data) {
        const { weather, main, wind, name } = data
        const result = {
            weatherIcon : "http://openweathermap.org/img/wn/" + weather[0].icon + ".png",
            weatherDescriptionHeader: weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1),
            temperature: Math.floor(main.temp) + "&#176",
            windSpeed: "Winds at " + Math.floor(wind.speed) + " m/s",
            cityHeader: name,
            humidity: "Humidity levels at " + main.humidity + "%",
            state: weather[0].main
        }
        return result
    }
}


class weatherBox {

    constructor(data, container) {
        this.data = data;
        this.container = container
        this.setWeatherData()
        this.setWeatherContainerPosition()
    }

    setBackground() {
        let bg = new Image();
        let bg_url = `./img/${this.data.state.toLowerCase()}.jpg`
        bg.src = bg_url
        bg.onerror = function () {
            document.body.style.backgroundImage = `url('./img/clear.jpg')`;
        }
        bg.onload = function() {
            document.body.style.backgroundImage = `url(${bg_url})`;
        }
    }

    setWeatherData() {
        for(const [key,value] of Object.entries(this.data)) {
            try {
                key != 'weatherIcon' ? document.getElementById(key).innerHTML = value : document.getElementById(key).src = value
            } catch(err) {
                key != 'state' ? console.log('Wrong ID') : this.setBackground()
            }
         }
    }
 
    setWeatherContainerPosition() {
        this.container.style.left = `calc(50% - ${this.container.clientWidth / 2}px)`;
        this.container.style.top = `calc(50% - ${this.container.clientHeight / 2}px)`;
        this.container.style.visibility = "visible";
    }
}