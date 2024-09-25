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

async function getData2(city) {
  const api_key = "ce2e6aa3315e4fa7a143dc4298493e56";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((Response) =>
    Response.json()
  );

  if (weather_data.cod === `404`) {
    cityName.innerText = `Sorry location not found`;
    weather_img.style = "background-color : #97d6df";
    cityTemp.innerText = ``;
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
