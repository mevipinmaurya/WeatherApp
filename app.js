// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=2464988f99e37e3e629cb30256594c88&units=metric";
// API HAS BEEN TAKEN FROM OPENWEATHER API WEBSITE "https://openweathermap.org/api"
const apiKey = "2464988f99e37e3e629cb30256594c88";
let city = "";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const btn = document.getElementById("searchBtn");
const inp = document.querySelector("input");
const temp = document.querySelector(".temp h3");
const cityName = document.querySelector(".city h3");
const humidityVal = document.getElementById("humidityPercent");
const windSpeedVal = document.getElementById("windSpeed");
const img = document.getElementById("weatherImg");
const country = document.querySelector(".countryName p");



// USING PROMISES TO FETCH URL
// const fetchUrl = ()=>{
//     fetch(apiUrl).then((res)=>{
//         return res.json();
//     }).then((res)=>{
//         console.log(res.wind.speed);
//     })
// }


// USING ASYNC AWAIT TO FETCH URL
const fetchUrl = async () => {
    let response = await fetch(url);
    let data = await response.json();

    // console.log(data.wind.speed);
    temp.innerText = data.main.temp + " ℃";
    cityName.innerText = city.slice(0, 1).toUpperCase() + city.slice(1);
    humidityVal.innerText = data.main.humidity + " %";
    windSpeedVal.innerText = data.wind.speed + " km/h";


    // console.log(data.weather);
    Array.from(data.weather).forEach((element) => {
        // console.log(element.main);
        if (element.main == "Clouds")
            img.src = "images/clouds.png";
        else if (element.main == "Mist")
            img.src = "images/mist.png";
        else if (element.main == "Haze")
            img.src = "images/drizzle.png";
        else if (element.main == "Rain")
            img.src = "images/rain.png";
        else if (element.main == "Clear")
            img.src = "images/clear.png";
        else if (element.main == "Fog")
            img.src = "images/snow.png";
        else
            img.src = "images/mist.png";
    })

    country.innerText = "Country Code : "+ data.sys.country;

}

btn.addEventListener("click", () => {
    let inpVal = inp.value;
    city = inpVal.toLowerCase();
    // console.log(city);
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchUrl();
});

