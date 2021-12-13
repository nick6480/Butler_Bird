
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {fetchWeather} from './api/fetchData';

/* CHANGE LINK TO GO BACK TO PREVIOUS */

function Weather() {
  const [weather, setWeather] = useState({})



  async function getWeather() {
      const weatherData = await fetchWeather()
      setWeather(weatherData)
  }

useEffect(() => {
  getWeather();
},[])


  return (
    <div className="settingsWrap">
      <div className="pageHeader">
        <h1>Weather</h1>
        <Link to="/">
          <img src="/img/icon-x.svg" />
        </Link>
      </div>
      <div>
        {weather.main && (
          <div className="weatherPageWrap">
            <div class="weatherPageMain">
              <div className="city">
                <span>{weather.name}</span>
                <sup>{weather.sys.country}</sup>
              </div>
              <div className="weatherTemp">
                <div>
                  <img className="cityIcon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                </div>
                <div className="cityTemp">
                  <h3>{Math.round(weather.main.temp)}</h3>
                  <sup>&deg;C</sup>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}



export default Weather
