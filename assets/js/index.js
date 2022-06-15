var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&exclude=&appid=6fcd46ca0bc9014cd6e642c6441a435a";
var searchForm = document.querySelector('#searchForm');
var searchFormInput = document.querySelector('#searchFormInput');


fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
        var currentCity = document.querySelector('#currentCity');

        var cityName = document.querySelector('#cityName');
        cityName.innerText = (JSON.stringify(data.timezone));

        var temp = document.createElement('p');
        temp.innerText = 'Temp: ' + (JSON.stringify(data.current.temp)) + 'deg';

        var wind = document.createElement('p');
        wind.innerText = 'Wind: ' + (JSON.stringify(data.current.wind_speed)) + 'mph';

        var humidity = document.createElement('p');
        humidity.innerText = 'Humidity: ' + (JSON.stringify(data.current.humidity));

        var uvi = document.createElement('p');
        uvi.innerText = 'UV Index: ' + (JSON.stringify(data.current.uvi));

        currentCity.append(cityName, temp, wind, humidity, uvi);
    });
});


searchForm.addEventListener('submit', function () {

});
