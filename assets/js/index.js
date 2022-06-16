var searchForm = document.querySelector('#searchForm');
var searchFormInput = document.querySelector('#searchFormInput');
var currentCity = document.querySelector('#currentCity');
var fiveDay = document.querySelector('.five-day');

var getCity = function (city) {

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fcd46ca0bc9014cd6e642c6441a435a&units=imperial`;

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {

            console.log(data);

            var cityName = document.createElement('h1');
            cityName.innerText = (JSON.stringify(data.name));
            cityName.classList = ('');

            var date = document.createElement('h2');
            date.innerText = moment().format('ddd MMM Do, YYYY');
            date.classList = ('');

            var temp = document.createElement('p');
            temp.innerText = 'Temp: ' + (JSON.stringify(data.main.temp)) + 'deg';
            temp.classList = ('');

            var wind = document.createElement('p');
            wind.innerText = 'Wind: ' + (JSON.stringify(data.wind.speed)) + 'mph';
            wind.classList = ('');

            var humidity = document.createElement('p');
            humidity.innerText = 'Humidity: ' + (JSON.stringify(data.main.humidity));
            humidity.classList = ('');


            var lat = data.coord.lat;
            var lon = data.coord.lon;

            var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6fcd46ca0bc9014cd6e642c6441a435a&units=imperial`;

            fetch(apiUrl2).then(function (response) {
                response.json().then(function (data) {
                    var uvi = document.createElement('p');
                    uvi.innerText = 'UV Index: ' + (JSON.stringify(data.current.uvi));
                    uvi.classList = ('');

                    currentCity.append(cityName, date, temp, wind, humidity, uvi);

                    fiveDayForecast(data.daily);
                })
            });
        });
    });
};


var fiveDayForecast = function (x, dateFrom) {

    var dates = [];

    for (var i = 0; i < 5; i++) {
        console.log(x[i]);

        var currentDay = document.getElementById(`${i}`);

        currentDay.innerText = '';

        // var date = document.createElement('h2');
        // date.innerText = moment().add({ days: 1 });
        // date.classList = ('');

        var date = moment(dateFrom);
        dates.push({ date: date.add(i + 1, "days").format("ddd MMM Do, YYYY") });


        var temp = document.createElement('p');
        temp.innerText = 'Temp: ' + (JSON.stringify(x[i].temp.day)) + 'deg';
        temp.classList = ('');

        var wind = document.createElement('p');
        wind.innerText = 'Wind: ' + (JSON.stringify(x[i].wind_speed)) + 'mph';
        wind.classList = ('');

        var humidity = document.createElement('p');
        humidity.innerText = 'Humidity: ' + (JSON.stringify(x[i].humidity));
        humidity.classList = ('');

        var uvi = document.createElement('p');
        uvi.innerText = 'UV Index: ' + (JSON.stringify(x[i].uvi));
        uvi.classList = ('');

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

searchForm.addEventListener('submit', searchCity);