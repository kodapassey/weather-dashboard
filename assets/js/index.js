var searchForm = document.querySelector('#searchForm');
var searchFormInput = document.querySelector('#searchFormInput');
var currentCity = document.querySelector('#currentCity');
var fiveDay = document.querySelector('.five-day');

// function for getting current city
var getCity = function (city) {

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fcd46ca0bc9014cd6e642c6441a435a&units=imperial`;

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {

            console.log(data);

            // creates h1 element for current city's name
            var cityName = document.createElement('h1');
            cityName.innerText = (data.name);
            cityName.classList = ('date-time');

            // creates h2 element for the current date
            var date = document.createElement('h2');
            date.innerText = moment().format('ddd MMM Do, YYYY');
            date.classList = ('date-time-Main');

            // shows user current temp for city they search for
            var temp = document.createElement('p');
            temp.innerText = 'Temp: ' + (data.main.temp) + 'deg';
            temp.classList = ('weather-conditions');

            // shows user current wind speed for city they search for
            var wind = document.createElement('p');
            wind.innerText = 'Wind: ' + (data.wind.speed) + 'mph';
            wind.classList = ('weather-conditions');

            // shows user current humidity for city they search for
            var humidity = document.createElement('p');
            humidity.innerText = 'Humidity: ' + (data.main.humidity);
            humidity.classList = ('weather-conditions');


            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6fcd46ca0bc9014cd6e642c6441a435a&units=imperial`;

            fetch(apiUrl2).then(function (response) {
                response.json().then(function (data) {

                    // shows user current UVI for city they search for
                    var uvi = document.createElement('p');
                    uvi.innerText = 'UV Index: ' + (data.current.uvi);
                    uvi.classList = ('weather-conditions');

                    currentCity.append(cityName, date, temp, wind, humidity, uvi);

                    fiveDayForecast(data.daily);
                })
            });
        });
    });
};


// function for getting 5 day forecast
var fiveDayForecast = function (x) {

    for (var i = 0; i < 5; i++) {
        console.log(x[i]);

        var currentDay = document.getElementById(`${i}`);

        currentDay.innerText = '';

        var date = document.createElement('h2');
        date.innerText = moment().add(i + 1, 'days').format('ddd MMM Do, YYYY');
        date.classList = ('date-time-5Day');

        var temp = document.createElement('p');
        temp.innerText = 'Temp: ' + (JSON.stringify(x[i].temp.day)) + 'deg';
        temp.classList = ('weather-conditions');

        var wind = document.createElement('p');
        wind.innerText = 'Wind: ' + (JSON.stringify(x[i].wind_speed)) + 'mph';
        wind.classList = ('weather-conditions');

        var humidity = document.createElement('p');
        humidity.innerText = 'Humidity: ' + (JSON.stringify(x[i].humidity));
        humidity.classList = ('weather-conditions');

        var uvi = document.createElement('p');
        uvi.innerText = 'UV Index: ' + (JSON.stringify(x[i].uvi));
        uvi.classList = ('weather-conditions');

        currentDay.append(date, temp, wind, humidity, uvi);

    };
};

var searchCity = function (event) {
    event.preventDefault();

    var city = searchFormInput.value.trim();

    searchFormInput.value = '';

    if (city) {
        currentCity.innerHTML = '';
        getCity(city);
    } else {
        alert('please enter a valid city');
    }
    console.log(event);
};

var saveCities = function () {
    localStorage.setItem('getCity', JSON.stringify(getCity()));
    // create button El when user searches for city
    // on click do localstorage.getItem/run function
    localStorage.setItem('fiveDayForecast', JSON.stringify(fiveDayForecast()));
}

searchForm.addEventListener('submit', searchCity, saveCities);