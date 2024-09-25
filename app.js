let city = document.getElementById("loc-name");
let btn = document.getElementById("search-btn");
let cityName = document.getElementById("city-name");
let cityTime = document.getElementById("city-time");
let cityTemp = document.getElementById("city-temp");
let cityhumidity = document.getElementById("city-humidity");
let cityWind = document.getElementById("city-wind");
let weather_img = document.querySelector("body");
let humi_img = document.getElementById("img1")
let wind_img = document.getElementById("img2")
// let apiKey = "45016e553aa4401c878104740242309";

// as we know the data is coming form an api means a network so the data is not gonna come instantly we have to use promises so we gonna create an async function getData inside which we gonna call an api
// async function getData(cityName) {
//   // This fetch is gonna return a promise when we await it
//   const promise = await fetch(
//       `http://api.weatherapi.com/v1/current.json?key=45016e553aa4401c878104740242309&q=${cityName}&aqi=yes`
//     );
//       return await promise.json();
// }
// btn.addEventListener("click", async() => {
//     //getting the input which is user going to enter
//     const value = city.value;
//     //calling the getData function and passing it the value of user input but this getData is also going to return promise so let make it async
//     let result = await getData(value);
//     console.log(result);
//      cityName.innerText = `${result.location.name}, ${result.location.country}`;
//     cityTime.innerText = ` ${result.location.localtime}`
//     cityTemp.innerText = ` ${result.current.temp_c} °C`;
//     cityhumidity.innerText = `Humidity : ${result.current.humidity}`;
//     cityWind.innerText = `Wind kph : ${result.current.wind_kph}`;
// });

async function getData2(city) {
  const api_key = "ce2e6aa3315e4fa7a143dc4298493e56";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((Response) =>
    Response.json()
  );

  if (weather_data.cod === `404`) {
    cityName.innerText = `Sorry location not found`;
    weather_img.style = "background-color : #97d6df";
    return;
  }
  cityTemp.innerText = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  cityName.innerText = `${weather_data.name}`;
  cityTime.innerText = `${weather_data.weather[0].main}`
  cityhumidity.innerText = `${weather_data.main.humidity}%`;
  cityWind.innerText = `${weather_data.wind.speed}km/h`;

  switch (weather_data.weather[0].main) {
    case "Rain":
      weather_img.style = "background-image: url('./images/rain_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover;";
      break;
    case "Haze":
      weather_img.style = "background-image: url('./images/haze_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover;";
      break;
    case "Snow":
      weather_img.style = "background-image: url('./images/snow_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover;";
      break;
    case "Clear":
      weather_img.style = "background-image: url('./images/clear_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover;";
      break;
    case "Clouds":
      weather_img.style = "background-image: url('./images/cloudy_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover; color: white";  
      break;
    case "Mist":
      weather_img.style = "background-image: url('./images/mist_bg.jpg'); object-fit: cover; background-repeat: no-repeat; background-size: cover;";
      break;
  }
  if(weather_data.weather[0].main === "Clouds"){
    wind_img.style = "filter : invert(1)"  
      humi_img.style = "filter : invert(1)"
  }else{
    wind_img.style = "filter : invert(0)"
    humi_img.style = "filter : invert(0)"
  }
  console.log(weather_data);
}

btn.addEventListener("click", () => {
  getData2(city.value);
});

document.addEventListener("keypress",(e)=>{
  if(e.key === "Enter"){
    getData2(city.value);
  }
})