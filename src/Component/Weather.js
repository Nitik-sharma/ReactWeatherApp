import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import "../index.css";

function Weather() {
  const [data, setData] = useState({});
  const [lat ,setLat]=useState("");
  const [long ,setLong]=useState("");
  const [location, setLocation] = useState("");
  const [tempUnit,setTempUnit]=useState("imperial");
  const [tempCelious,setTempCelious]=useState("");
  const [tempFran,setTempFran]=useState("");
  

function geoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
            setLat("latitude"+position.coords.latitude);
            setLong("longitude"+position.coords.longitude);
        })
    }
}


  const AddApi=()=>{
    
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b328d8ea7f4088f01ed237defe8a849f&units=${tempUnit}`;
    if (location !== "") {
      try {
        axios.get(url).then((res) => {
          setData(res.data);
          setTempCelious(Math.floor(res.data.main.temp));
          setTempFran(Math.floor(res.data.main.temp *1.8+32));
          console.log(res.data);
        });
        setLocation("");
      } catch (error) {
        console.log(error);
      }
    }

    
    }

    
    
    function toggleTempUnit(){
      if(tempUnit==='imperial'){
        setTempUnit("metric");
      }else{
        setTempUnit("imperial");
      }

  }

  
    geoLocation();
  
    

  

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="Enter your Location"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={AddApi} className="search-icon">Search</button>
      </div>
      {/* top box */}
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        {/* temprature */}
        <div className="temp">
          {
            tempUnit==='imperial' && tempFran!==""?(<h1>{tempFran}°F{" "}<br/><button onClick={toggleTempUnit}className="toggle">Switch to Celsius</button></h1> ):(<h1>{tempCelious}°C{" "}<br/> <button onClick={toggleTempUnit} className="toggle">Switch to Fahrenheit</button></h1>)
          }
        </div>
        {/* description */}
        <div className="description">
          {data.weather ?<p>{data.weather[0].description}</p>:null}
        </div>
      </div>
      {/* footer */}
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like}°F</p> : null}
          <p>Feel Like</p>
        </div>
        {/* humidity */}
        <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        {/* wind */}
        <div className="wind">
          {data.wind?<p className="bold">{data.wind.speed} MPH</p>:null}
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
