console.log('hello jee babbar');

const API_key = "1c54c33952779ec69e08163bb90104f7";

function renderWeatherInfo(data){
 let newPara = document.createElement('p');
     newPara.textContent =`${data?.main?.temp.toFixed(2)} ºC`  
    
     document.body.appendChild(newPara);
}

async function showWeather() {
// try catch is used to handle error while fetching the data
   
try {
         // let latitude = 15.3333;
    // let longitude = 74.0833;
    // we will not use latitude and longitude because here api is featching the data by city name
    let city = "delhi";

    // we have use the await so that response will wait until the data is not fetched
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
   
    // yaha pe bhi await lagaya hai taki data phele json me convert ho jaye tab hum usko print kare
    const data = await response.json();
     console.log("Weather data:->",data);

     renderWeatherInfo(data)
    // renderWeatherInfo is used to show the information on UI 
    } 
    
    catch (error) {
        // handle the error here
    }
   
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocation Support");

    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let longi= position.coords.longitude;

    console.log(lat);
    console.log(longi);
}
