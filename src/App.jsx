import { Routes, Route, Navigate } from "react-router-dom"

import Callback from './components/Common/Callback/Callback';
import ConfiguratorPage from './components/Pages/Configurator/ConfiguratorPage';
import ProfilePage from './components/Pages/Profile/ProfilePage';
import AggregatorPage from './components/Pages/Aggregator/AggregatorPage';
import ContributorPage from './components/Pages/Contributor/ContributorPage';
import ContributorRequestsPage from './components/Pages/Contributor/ContributorRequestsPage';
import AggregatorOneElement from './components/Layout/Aggregator/AggregatorOneElement';
import HomePage from './components/Pages/Home/HomePage';
import TestPage from './components/Pages/TestPage/TestPage';
import UnauthorizedPage from "./components/Pages/Error/UnauthorizedPage";
import ForbiddenPage from "./components/Pages/Error/ForbiddenPage";
import './App.css'


function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={ <Navigate to="/home" /> } />
        <Route path="/tests" element={ <TestPage /> } />
        <Route path="/home" element={ <HomePage /> } />
        <Route path="/configurator" element={ <ConfiguratorPage /> } />
        <Route path="/home/callback" element={ <Callback /> } />
        <Route path="/account" element={ <ProfilePage /> } />
        <Route path="/prices" element={ <AggregatorPage /> } />
        <Route path="/contributor" element={ <ContributorPage /> } />
        <Route path='/contributor-requests' element={ <ContributorRequestsPage /> } />
        <Route path="/prices/:componentId" element={ <AggregatorOneElement /> } />

        <Route path="/unauthorized" element={ <UnauthorizedPage /> } />
        <Route path="/forbidden" element={ <ForbiddenPage /> } />

      </Routes>
    </>
  );
}


export default App
