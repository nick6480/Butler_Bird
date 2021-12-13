import './App.css'
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {fetchWeather} from './api/fetchData';


function Weatherwidget() {
  const [weather, setWeather] = useState({})



  async function getWeather() {
      const weatherData = await fetchWeather()
      console.log(weatherData);
      setWeather(weatherData)
  }

useEffect(() => {
  getWeather();
},[])


  return (
    <div >
      {weather.main && (
        <Link to="/weather">
          <div className="weatherwidget">
            <img className="cityIcon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <div>
              <span>{Math.round(weather.main.temp)}</span>
              <sup>&deg;</sup>
            </div>

          </div>
        </Link>
      )}
    </div>
  )
}


export default Weatherwidget;
