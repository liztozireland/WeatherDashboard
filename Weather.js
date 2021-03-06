let weather = {
    apiKey: "83fe1b09475078af6c078ccf5a2358a5",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {name} = data;
        this.name = name;
        const {icon,description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText ="Weather description: " + description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed " + speed + "mp/h";
        this.fetchForecast(data.coord.lat,data.coord.lon)
    },
    fetchForecast: function (lat,lon) {
        console.log("fetchForecast")
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => this.displayForecast(data))
    },
    displayForecast: function (data){
        console.log(data)
        document.querySelector("#fiveDay").innerHTML=""
        for (let i=1; i<6; i++) {
            let day = data.daily[i]
        
        document.querySelector("#fiveDay").innerHTML+=`
        <div class="display-card2">
            <div class="Weater">
                <h2 class="city">Weather in ${this.name}</h2>
                <h1 class="temperature">${day.temp.day}°F</h1>
                <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="Weather Icon" class="icon">
    
                <div class="description">Weather Description: ${day.weather[0].description}</div>
                <div class="humidity">Humididity: ${day.humidity}%</div>
                <div class="Wind">Wind Speed: ${day.wind_speed}mp/h</div>
                <div style="background-color:${day.uvi <3 ? "success" : "danger"}" class="wind ">UVI Index: ${day.uvi}</div>
                <div class="save-button"></div>
            </div>`
        }
    },
    search: function () {
        this.saveToLocal(document.querySelector(".searchbar").value);
        this.fetchWeather (document.querySelector(".searchbar").value);
    },
    saveToLocal: function (city) {
       let cities = JSON.parse(localStorage.getItem("cities")) || [];
       cities.push(city)
       localStorage.setItem("cities", JSON.stringify(cities))
       this.getLocalStorage()
    },
    getLocalStorage: function () {
        let cities = JSON.parse(localStorage.getItem("cities")) || [];
        let historyEl = document.querySelector(".searchHistory")
        historyEl.innerHTML=""
        cities.forEach(city => {
            let btn = document.createElement("button")
            btn.textContent = city;
            btn.onclick = (event) => {
              this.fetchWeather(event.target.textContent)
            }
            historyEl.appendChild(btn)
        })
    }
}; 


document.querySelector(".search-button").addEventListener("click", function (){weather.search();})

weather.fetchWeather("Los Angeles");
weather.getLocalStorage();