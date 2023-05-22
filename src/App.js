import React, { useState, useEffect } from 'react';
import Home from './components/Pages/Home/Home';
import { Routes, Route, Navigate } from "react-router-dom"
import Callback from './components/Common/Callback/Callback';
import Configurator from './components/Pages/Configurator/Configurator';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/configurator" element={ <Configurator /> } />
        <Route path="/home/callback" element={ <Callback />} />
      </Routes>
    </>
  );
}


export default App;
