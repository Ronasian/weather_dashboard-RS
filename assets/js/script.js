var userInput = document.querySelector('input');
var searchBtn = document.querySelector('#searchBtn');
var history = document.querySelector('#history');
var historyList = document.querySelector('#historyList')
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

var searchHistory = [];
// renders history list under search history
function renderHistory() {
    // resets innerHTML before rendering
    historyList.innerHTML = "";
    // Render a new li with button for each searched city
    for (var i = 0; i < searchHistory.length; i++) {
        var search = searchHistory[i];
        
        var li = document.createElement("li");

        var button = document.createElement("button");
        
        li.appendChild(button);
        historyList.appendChild(li);
        button.textContent = search;
    }
}

function initHistory() {
    // Get stored history from localStorage
    var storedHistory = JSON.parse(localStorage.getItem("cities"));
  
    // If storedHistory was retrieved from localStorage, update the searchHistory array to it
    if (storedHistory !== null) {
      searchHistory = storedHistory;
    }
    // call to render history function for initialization
    renderHistory();
}

function storeHistory() {
    // Stringify and set key in localStorage to searchHistory array
    localStorage.setItem("cities", JSON.stringify(searchHistory));
}

function renderForecast() {
    var input = userInput.value;

    // Return from function early if submitted userInput is blank
    if (input === "") {
      return;
      // also if user input isn't already in the array
    } else if (searchHistory.indexOf(input) === -1) {
        // push new city to arry
        searchHistory.push(input);
    }
    //reset userInput value to blank
    userInput.value = "";
    // Store updated history array in localStorage, re-render the list
    storeHistory();
    renderHistory();

    var city = input.split(', ')[0];
    var state = input.split(', ')[1];

    var apiURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + 
    city + ',' + state + ',USA&limit=1&appid=' + apiKey;
    console.log(apiURL)
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lng = data[0].lon;

            apiURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + 
            lat + '&lon=' + lng + '&appid=' + apiKey;

            fetch(apiURL)
                .then(function (response) {
                return response.json();
            })
                .then(function (data) {
                console.log(data)
                // easy access to each object for the 5 day forecast
                var dataSet1 = data.list[4];
                var dataSet2 = data.list[12];
                var dataSet3 = data.list[20];
                var dataSet4 = data.list[28];
                var dataSet5 = data.list[36];
                // each day accesses information from specific objects in the API array
                firstDay.children[0].textContent = reverseDate(dataSet1.dt_txt);
                firstDay.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet1.weather[0].icon + '.png')
                firstDay.children[2].textContent = convertTemp(dataSet1.main.temp);
                firstDay.children[3].textContent = "Humidity: " + dataSet1.main.humidity + "%";
                firstDay.children[4].textContent = "Wind: " + dataSet1.wind.speed + " mph";
                
                secondDay.children[0].textContent = reverseDate(dataSet2.dt_txt);
                secondDay.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet2.weather[0].icon + '.png')
                secondDay.children[2].textContent = convertTemp(dataSet2.main.temp);
                secondDay.children[3].textContent = "Humidity: " + dataSet2.main.humidity + "%";
                secondDay.children[4].textContent = "Wind: " + dataSet2.wind.speed + " mph";
                
                thirdDay.children[0].textContent = reverseDate(dataSet3.dt_txt);
                thirdDay.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet3.weather[0].icon + '.png')
                thirdDay.children[2].textContent = convertTemp(dataSet3.main.temp);
                thirdDay.children[3].textContent = "Humidity: " + dataSet3.main.humidity + "%";
                thirdDay.children[4].textContent = "Wind: " + dataSet3.wind.speed + " mph";
                
                fourthDay.children[0].textContent = reverseDate(dataSet4.dt_txt);
                fourthDay.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet4.weather[0].icon + '.png')
                fourthDay.children[2].textContent = convertTemp(dataSet4.main.temp);
                fourthDay.children[3].textContent = "Humidity: " + dataSet4.main.humidity + "%";
                fourthDay.children[4].textContent = "Wind: " + dataSet4.wind.speed + " mph";
                
                fifthDay.children[0].textContent = reverseDate(dataSet5.dt_txt);
                fifthDay.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + dataSet5.weather[0].icon + '.png')
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
                    weatherHeader.children[1].setAttribute('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
                    currentWeather.children[1].textContent = convertTemp(data.main.temp);
                    currentWeather.children[2].textContent = "Humidity: " + data.main.humidity + "%";
                    currentWeather.children[3].textContent = "Wind: " + data.wind.speed + " mph";

                    results.classList.remove('hidden');
                })
        });
}
// helper function to format date given by API
function reverseDate(text) {
    var date = text.split(' ')[0].split('-');
    var month = date[1];
    var day = date[2];
    var year = date[0];
    return month + '/' + day + '/' + year;
}
// helper function that converts K to F
function convertTemp(temp) {
    return "Temp: " + Math.round(1.8 * (temp - 273) + 32) + '°F';
}
// event listener for search button (renders forecast)
searchBtn.addEventListener('click', renderForecast);
// event listener for history buttons (sets userInput to button text content and renders forecast)
historyList.addEventListener("click", function(event) {
    var element = event.target;
    // Checks if element is a button
    if (element.matches("button") === true) {
    // Store updated todos in localStorage, re-render the list
    userInput.value = element.textContent;
    renderForecast();

    }
  });
// inititalizes history everytime page loads
initHistory();