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
    
    "https://api.openweathermap.org/data/2.5/weather?q=" +

    cityInput.value +
    
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
            
            await uvIndex(data.coord.lat, data.coord.lon);

            var weatherIcon = data.weather[0].icon;

            var iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

            var iconImg = `<img src="${iconUrl}"/>`;





            cityHeader.innerHTML = cityValue + date.format(" M/DD/YYYY ") + iconImg;
            temperature.innerHTML = "Temperature: " + temperatureValue + " Fahrenheit";
            humidity.innerHTML = "Humidity: " + humidityValue + " %";
            wind.innerHTML = "Wind Speed: " + windValue + " MPH";

    } else {
        alert("error!");
    }
})

async function uvIndex(lat, lon) {

    var latLon =

    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    
    lat +
    
    "&lon=" +
    
    lon +
    
    "&units=imperial&appid=562f6213ad0815575de94f7b40671638";

    var response = await fetch(latLon);

    if (response.ok) {

        console.log(response);
        
        var data = await response.json();

        console.log(data);

        var uviValue = data.current.uvi;

        var weeklyForecastData = data.daily;

        console.log(weeklyForecastData);


        uvi.innerHTML = "UVI: " + uviValue;

        console.log(uviValue);

        if (uviValue < 4) {

            document.getElementById("favorable").style.visibility = "visible";
            document.getElementById("moderate").style.visibility = "hidden";
            document.getElementById("severe").style.visibility = "hidden";
            
        } else if (uviValue < 6) {

            document.getElementById("moderate").style.visibility = "visible";
            document.getElementById("favorable").style.visibility = "hidden";
            document.getElementById("severe").style.visibility = "hidden";

        } else {

            document.getElementById("severe").style.visibility = "visible";
            document.getElementById("favorable").style.visibility = "hidden";
            document.getElementById("moderate").style.visibility = "hidden";
        }

        weeklyForecastDiv = '';

        for ( var i = 0; i < weeklyForecastData.length; i++) { 
            if (i >= 5)
            break;

            var weeklyData = weeklyForecastData[i];
            var weeklyTemp = weeklyData.temp.day;
            var weeklyWind = weeklyData.wind_speed;
            var weeklyHumidity = weeklyData.humidity;

            var weatherIcon = weeklyData.weather[0].icon;
            var iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            var iconImg = `<img src="${iconUrl}" style="width: 40px"/>`;

            weeklyForecastDiv += `

                <div class="card" style="flex: 1">

                    <h5>
                    ${moment(new Date(weeklyData.dt * 1000)).format(" M/DD/YYYY ")}
                    ${iconImg}
                    </h5>

                    <p>Temperature: ${weeklyTemp} Fahrenheit</p>
                    <p>Wind Speed: ${weeklyWind} MPH</p>
                    <p>Humidity: ${weeklyHumidity} %</p>

                </div>
            `
        }

        console.log(weeklyForecastDiv);
        var weeklyWeather = document.getElementById("weekly-weather");
        weeklyWeather.innerHTML = weeklyForecastDiv
    }
}

