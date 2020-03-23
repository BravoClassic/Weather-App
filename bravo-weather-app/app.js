const apikey='559a7e87e81a06552b38ab419bab290e';

//Select Elements
const notification=document.querySelector('.notification');//Display error message for location
const iconElement=document.querySelector('.weather-icon');//container for the icons
const tempElement=document.querySelector('.temperature-value p');
const tempDescriElement=document.querySelector('.temperature-description p');
const locationElement=document.querySelector('.location p');


//App data
const weather={};
weather.temperature={
  unit:'celsius'
};

//App Consts and vars
const KELVIN=273;

//Check if browser has geolocation
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
  notification.style.display='block';
  notification.innerElement="<p>Geolation not supported on this browser</p>";
}

//Set user's position

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  // let lat=latitude;
  // let long=longitude;
  getWeather(latitude,longitude);
}


function getWeather(lat,long) {
  let api=`http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=${apikey}&lat=${lat}&lon=${long}`;
  fetch(api)
      .then((response)=>{
        let data = response.json();
        console.log(data);
          return data;
      })
      .then((data)=>{
        weather.temperature.value=Math.floor(data.main.temp-KELVIN);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
      })
      .then(()=>{
        displayWeather();
      });
}

//Display weather in UI
function displayWeather() {
  iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML=`${weather.temperature.value}&deg;<span>C</span>`;
  tempDescriElement.innerHTML=`${weather.description}`;
  locationElement.innerHTML=`${weather.city},${weather.country}`;
}


setTimeout(300000,getWeather());

//Show error when there is an issue with Geolation service
function showError(error) {
  notification.style.display="block";
  notification.style.display=`<p>${error.message}</p>`;
}
