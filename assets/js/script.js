var userInput = document.querySelector('input');
var searchBtn = document.querySelector('#searchBtn');
var history = document.querySelector('#history');
var results = document.querySelector('#results');
var currentWeather = document.querySelector('#current-weather');
var weatherHeader = document.querySelector('#weather-header');
var forecast = document.querySelector('#forecast');
var firstDay = document.querySelector('#day-1');
var secondDay = document.querySelector('#day-2');
var thirdDay = document.querySelector('#day-3');
var fourthDay = document.querySelector('#day-4');
var fifthDay = document.querySelector('#day-5');

var apiKey = '65ef1ab7716004b40ee3581702fa7229';

function renderForecast() {
    var input = userInput.value;
    if (input.indexOf(', ') !== -1) {
        var city = input.split(', ')[0];
        var state = input.split(', ')[1];
    } else {
        var city = input.split(' ')[0];
        var state = input.split(' ')[1];
    }
    console.log(city);
    console.log(state);
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + 
    city + ',' + state + ',USA&limit=1&appid=' + apiKey;
    console.log(apiURL)
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lng = data[0].lon;

            apiURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + 
            lat + '&lon=' + lng + '&appid=' + apiKey;

            fetch(apiURL)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                console.log(data)
                var dataSet1 = data.list[4];
                var dataSet2 = data.list[12];
                var dataSet3 = data.list[20];
                var dataSet4 = data.list[28];
                var dataSet5 = data.list[36];

                firstDay.children[0].textContent = reverseDate(dataSet1.dt_txt);
                firstDay.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + dataSet1.weather[0].icon + '.png')
                firstDay.children[2].textContent = convertTemp(dataSet1.main.temp);
                firstDay.children[3].textContent = "Humidity: " + dataSet1.main.humidity + "%";
                firstDay.children[4].textContent = "Wind: " + dataSet1.wind.speed + " mph";
                
                secondDay.children[0].textContent = reverseDate(dataSet2.dt_txt);
                secondDay.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + dataSet2.weather[0].icon + '.png')
                secondDay.children[2].textContent = convertTemp(dataSet2.main.temp);
                secondDay.children[3].textContent = "Humidity: " + dataSet2.main.humidity + "%";
                secondDay.children[4].textContent = "Wind: " + dataSet2.wind.speed + " mph";
                
                thirdDay.children[0].textContent = reverseDate(dataSet3.dt_txt);
                thirdDay.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + dataSet3.weather[0].icon + '.png')
                thirdDay.children[2].textContent = convertTemp(dataSet3.main.temp);
                thirdDay.children[3].textContent = "Humidity: " + dataSet3.main.humidity + "%";
                thirdDay.children[4].textContent = "Wind: " + dataSet3.wind.speed + " mph";
                
                fourthDay.children[0].textContent = reverseDate(dataSet4.dt_txt);
                fourthDay.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + dataSet4.weather[0].icon + '.png')
                fourthDay.children[2].textContent = convertTemp(dataSet4.main.temp);
                fourthDay.children[3].textContent = "Humidity: " + dataSet4.main.humidity + "%";
                fourthDay.children[4].textContent = "Wind: " + dataSet4.wind.speed + " mph";
                
                fifthDay.children[0].textContent = reverseDate(dataSet5.dt_txt);
                fifthDay.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + dataSet5.weather[0].icon + '.png')
                fifthDay.children[2].textContent = convertTemp(dataSet5.main.temp);
                fifthDay.children[3].textContent = "Humidity: " + dataSet5.main.humidity + "%";
                fifthDay.children[4].textContent = "Wind: " + dataSet5.wind.speed + " mph";
            });
            
            apiURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=' + apiKey;

            fetch(apiURL)
                .then(function (response) {
                    return response.json();
            })
                .then(function (data) {
                    console.log(data);
                    var currentDate = dayjs().format('(MM/DD/YYYY)');
                    
                    weatherHeader.children[0].textContent = city + ", " + state + " " + currentDate;
                    weatherHeader.children[1].setAttribute('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                    currentWeather.children[1].textContent = convertTemp(data.main.temp);
                    currentWeather.children[2].textContent = "Humidity: " + data.main.humidity + "%";
                    currentWeather.children[3].textContent = "Wind: " + data.wind.speed + " mph";

                    results.classList.remove('hidden');
                })
                
        });
    
}

function reverseDate(text) {
    var date = text.split(' ')[0].split('-');
    var month = date[1];
    var day = date[2];
    var year = date[0];
    return month + '/' + day + '/' + year;
}

function convertTemp(temp) {
    return "Temp: " + Math.round(1.8 * (temp - 273) + 32) + '°F';
}

searchBtn.addEventListener('click', renderForecast);

console.log(firstDay.children[0].textContent);