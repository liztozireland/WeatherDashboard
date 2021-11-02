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
        const {icon,description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity,speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed " + speed + "mp/h";
    },
    search: function () {
        this.fetchWeather (document.querySelector(".searchbar").value);
    }
};

// function saveData (text) {
//     var text = $(this).parent().parent().siblings(".td-class").children(".input-group").children("input").val()
//     var time = $(this).parent().parent().parent().data("time")
//     console.log(text)
//     localStorage.setItem(time, text)
//    }
//    $(".btn").each(function (){
//      $(this).on("click", saveData)
//    })
   
//    function printData (text) {
//      var projectDisplayEl = $('<p>').addClass('project-display').text(task);
   
//      projectDisplayEl.append(text)
//      console.log("hi")
     
//     }

document.querySelector(".search-button").addEventListener("click", function (){weather.search();})

// document.querySelector(".search-button").addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//         weather.search();
//     }
// })

weather.fetchWeather("Los Angeles");