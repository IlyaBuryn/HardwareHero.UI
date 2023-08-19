import { Routes, Route, Navigate } from "react-router-dom"

import Callback from './components/Common/Callback/Callback';
import Configurator from './components/Pages/Configurator/Configurator';
import ProfilePage from './components/Pages/Profile/ProfilePage';
import Aggregator from './components/Pages/Aggregator/Aggregator';
import ContributorPage from './components/Pages/Contributor/ContributorPage';
import ContributorRequestsPage from './components/Pages/Contributor/ContributorRequestsPage';
import AggregatorOneElement from './components/Layout/Aggregator/AggregatorOneElement';
import HomePage from './components/Pages/Home/HomePage';
import TestPage from './components/Pages/TestPage/TestPage';
import UnauthorizedPage from "./components/Pages/Error/UnauthorizedPage";
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path="/tests" element={ <TestPage /> } />
        <Route path="/home" element={ <HomePage /> } />
        <Route path="/configurator" element={ <Configurator /> } />
        <Route path="/home/callback" element={ <Callback /> } />
        <Route path="/account" element={ <ProfilePage /> } />
        <Route path="/prices" element={ <Aggregator /> } />
        <Route path="/contributor" element={ <ContributorPage /> } />
        <Route path='/contributor-requests' element={ <ContributorRequestsPage /> } />
        <Route path="/prices/:componentId" element={ <AggregatorOneElement /> } />
        <Route path="/unauthorized" element={ <UnauthorizedPage /> } />
      </Routes>
    </>
  );
}

export default App
