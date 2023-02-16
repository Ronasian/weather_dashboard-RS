var userInput = document.querySelector('input');
var searchBtn = document.querySelector('#searchBtn');
var history = document.querySelector('#history');
var results = document.querySelector('#results');
var currentWeather = document.querySelector('#current-weather');
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
                console.log(data);
                
                var dataSet1 = data.list[0];
                var dataSet2 = data.list[8];
                var dataSet3 = data.list[16];
                var dataSet4 = data.list[24];
                var dataSet5 = data.list[32];

                firstDay.children[0].textContent = reverseDate(dataSet1.dt_txt);
                firstDay.children[1].textContent = data.list;
            });
        });
    results.classList.remove('hidden')
}

function reverseDate(text) {
    var date = text.split(' ')[0].split('-');
    var month = date[2];
    var day = date[1];
    var year = date[0];
    return month + '/' + day + '/' + year;
}

searchBtn.addEventListener('click', renderForecast);

console.log(firstDay.children[0].textContent);