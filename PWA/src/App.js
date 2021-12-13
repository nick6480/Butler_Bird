import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

import './App.css'

import { fetchStyle } from './api/fetchStyle';
import Nav from './Nav';
import Restaurants from './Restaurants';
import Activities from './Activities';
import Content from './Content';
import Weather from './Weather';
import Settings from './Settings';
import Weatherwidget from './Weatherwidget';

import Hotel from './Hotel';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <Weatherwidget />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Hotel fetchUrl={'/content/get'}/>} />
            <Route path="/restaurants" element={<Restaurants/>} />
            <Route path="/activities" element={<Activities/>} />

            <Route path="/settings" element={<Settings/>} />
            <Route path="/weather" element={<Weather/>} />

            <Route path="/content/:name/:catid/:contentid" element={<Content/>} />
            <Route path="/restaurant/:name" element={<Content/>} />

          </Routes>
        </div>
        <Nav />
      </div>
    </Router>
  );
}


export default App;
