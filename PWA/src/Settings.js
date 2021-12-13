import React from 'react';

import {Link} from 'react-router-dom';


/* CHANGE LINK TO GO BACK TO PREVIOUS */
function Settings() {
  return (
    <div className="settingsWrap">
      <div className="pageHeader">
        <h1>Settings</h1>
        <Link to="/">
          <img src="/img/icon-x.svg" />
        </Link>
      </div>
      <div className="settings">
      <div className="accessibility setting">
        <h2>Accessibility</h2>
        <div>
          <div>
            <span>Language</span>
              <select class="action" name="language">
                <option selected="selected" class="option" value="english">English</option>
              </select>
          </div>
          <div>
            <span>Text Size</span>
              <select class="action" name="fontSize">
                <option selected="selected" class="option" value="normal">Normal</option>
                <option class="option" value="large">Large</option>
              </select>
          </div>
        </div>
      </div>
      <div className="design setting">
        <h2>Design</h2>
        <div>
          <span>Theme</span>
            <select class="action" name="theme">
              <option selected="selected" class="option" value="light">Light</option>
              <option class="option" value="large">Large</option>
            </select>
        </div>
      </div>
      <div className="weather setting">
        <h2>Weather</h2>
        <div>
          <span>Weather widget</span>
            <select class="action" name="weatherWidget">
              <option selected="selected" class="option" value="true">Show</option>
              <option class="option" value="false">Don't show</option>
            </select>
        </div>
        <div>
          <span>Temperature Unit</span>
            <select class="action" name="weatherUnit">
              <option selected="selected" class="option" value="celcius">Celcius</option>
              <option class="option" value="fahrenheit">Fahrenheit</option>
            </select>
        </div>
      </div>
    </div>
  </div>
  )
}


export default Settings
