const apiKey = "8a5eded6cd5161714db5bb2282479170";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const searchBtn = document.querySelector("#search");
const cityInput = document.getElementById("city-input");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

//loader

const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

const getWeatherData = async (city) => {
    toggleLoader();

    const keyWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(keyWeather);
    const data = await response.json();

    toggleLoader();
    
    return data;
}

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };

const showWeatherData = async(city) =>{
   const data = await getWeatherData(city);

   if (data.cod === "404") {
    showErrorMessage();
    return;
  }

   cityElement.innerHTML = data.name;
   tempElement.innerHTML = parseInt(data.main.temp);
   descElement.innerHTML = data.weather[0].description;
   weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
   countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/shiny/64.png`);
   humidityElement.innerText = `${data.main.humidity}%`;
   windElement.innerText = `${data.wind.speed}km/h`;

   // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

   weatherContainer.classList.remove("hide");
}


// eventos

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });
  
  // Sugestões
  suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });








