


var cityInput = document.getElementById("city-input");
var searchButton = document.getElementById("search-button");
var cityHeader = document.getElementById("city-header");
var date = moment();

var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var uvi = document.getElementById("uvi");

searchButton.addEventListener("click", async function() {

    var openWeatherApi = 
    
    "http://api.openweathermap.org/data/2.5/weather?q="

    + cityInput.value +
    
    "&units=imperial&appid=562f6213ad0815575de94f7b40671638";

    var response = await fetch(openWeatherApi);

    console.log(response);

    if (response.ok) {

            console.log(response);

            var data = await response.json();
            var cityValue = data.name;
            var temperatureValue = data.main.temp;
            var humidityValue = data.main.humidity;
            var windValue = data.wind.speed;
            console.log(data);
            var latValue = data.coord.lat;
            var lonValue = data.coord.lon;

            cityHeader.innerHTML = cityValue + date.format(" M/DD/YYYY ");
            temperature.innerHTML = "Temperature:" + temperatureValue + "Fahrenheit";
            humidity.innerHTML = "Humidity:" + humidityValue + "%";
            wind.innerHTML = "Wind Speed:" + temperatureValue + "MPH";

    } else {
        alert("error!");
    }
})


