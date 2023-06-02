import React, { useState, useEffect } from 'react';
import Home from './components/Pages/Home/Home';
import { Routes, Route, Navigate } from "react-router-dom"
import Callback from './components/Common/Callback/Callback';
import Configurator from './components/Pages/Configurator/Configurator';
import ProfilePage from './components/Pages/Profile/ProfilePage';
import Aggregator from './components/Pages/Aggregator/Aggregator';
import Contributor from './components/Pages/Contributor/Contributor';
import ContributorRequestsPage from './components/Pages/Contributor/ContributorRequestsPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/configurator" element={ <Configurator /> } />
        <Route path="/home/callback" element={ <Callback /> } />
        <Route path="/account" element={ <ProfilePage openAssemblies={false}/> } />
        <Route path="/prices" element={ <Aggregator /> } />
        <Route path="/contributor" element={ <Contributor /> } />
        <Route path='/contributor-requests' element={ <ContributorRequestsPage /> } />
      </Routes>
    </>
  );
}


export default App;
