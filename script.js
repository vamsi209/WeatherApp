const main = document.getElementById("mainEl");
const form = document.getElementById("formEl");
const search = document.getElementById("search");


const apikey = 'ccf520a00309bc954f35d5de3ca08c92';
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeather(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();
    addWeathertoPage(respData);
}

function addWeathertoPage(data) {
    const temp = KtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2> <img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp} °C </h2>
        <small> ${search.value} City - ${data.weather[0].main} </small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}

//console.log(search.value);

form.addEventListener('submit', (e) => {

    e.preventDefault();
    console.log("Entering event listener");
    const city = search.value;
    console.log(city);

    if (city) {
        getWeather(city);
    }

});