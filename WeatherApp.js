const cityInput = document.querySelector(".cityInput")
const weatherForm = document.querySelector(".weatherForm")
const apikey = "b5d9b6adc4d85976af42a4a322b20cad";
const card = document.querySelector(".card")

weatherForm.addEventListener("submit" , async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherdata = await getWeatherData(city);
            displayCityInfo(weatherdata);
        }
        catch(error){
            console.log(error);
            displayerror(error)
        }
    }
    else{
        displayerror("Please enter city name");
    }

});
async function getWeatherData(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(apiurl)
    //console.log(response)
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }
    return await response.json();
}
function displayCityInfo(data){
    const {name:city,
        main:{temp,humidity}, 
        weather: [{description, id}]} = data;
        console.log(data)

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(((temp - 273.15) * 9/5) +32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getEmoji(id);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}
function getEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️"
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"
        case (weatherId === 800):
            return "☀️"
        case (weatherId >= 801 && weatherId <810):
            return "☁️"
        default:
            return "❓"
        
    }
}
function displayerror(message){
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}