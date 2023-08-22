import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@mui/material";

import ConfiguratorPage from './pages/Configurator/ConfiguratorPage';
import ProfilePage from './pages/Profile/ProfilePage';
import AggregatorPage from './pages/Aggregator/AggregatorPage';
import ContributorPage from './pages/Contributor/ContributorPage';
import ContributorRequestsPage from './pages/Contributor/ContributorRequestsPage';
import AggregatorOneElement from './components/Layout/Aggregator/AggregatorOneElement';
import HomePage from './pages/Home/HomePage';
import TestPage from './pages/TestPage/TestPage';
import UnauthorizedPage from "./pages/Error/UnauthorizedPage";
import ForbiddenPage from "./pages/Error/ForbiddenPage";
import SnackbarBlock from "./components/Common/Snackbar/SnackbarBlock";
import useExecuteAfterReload from "./hooks/ExecuteAfterReload";
import { AuthDialogProvider } from "./components/Common/Dialog/AuthDialogContext";
import { standardTheme } from "./utils/theme";
import './App.css'


function App() {

  useExecuteAfterReload();

  return (
    <>
      <ThemeProvider theme={standardTheme}>
        <AuthDialogProvider >
          <Routes>

            <Route path="/" element={ <Navigate to="/home" /> } />
            <Route path="/tests" element={ <TestPage /> } />
            <Route path="/home" element={ <HomePage /> } />
            <Route path="/configurator" element={ <ConfiguratorPage /> } />
            <Route path="/account" element={ <ProfilePage /> } />
            <Route path="/prices" element={ <AggregatorPage /> } />
            <Route path="/contributor" element={ <ContributorPage /> } />
            <Route path='/contributor-requests' element={ <ContributorRequestsPage /> } />
            <Route path="/prices/:componentId" element={ <AggregatorOneElement /> } />

            <Route path="/unauthorized" element={ <UnauthorizedPage /> } />
            <Route path="/forbidden" element={ <ForbiddenPage /> } />

          </Routes>

          <SnackbarBlock />
        </AuthDialogProvider>
      </ThemeProvider>
    </>
  );
}


export default App
