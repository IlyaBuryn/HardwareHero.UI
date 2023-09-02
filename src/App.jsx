import React from "react";
import { Routes, Route } from "react-router-dom"
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
import NotFoundPage from "./pages/Error/NotFoundPage";


function App() {

  useExecuteAfterReload();

  const routes = [{ path: "/", element: <HomePage /> },
    { path: "/home", element: <HomePage /> },
    { path: "/tests", element: <TestPage /> },
    { path: "/configurator", element: <ConfiguratorPage /> },
    { path: "/account", element: <ProfilePage /> },
    { path: "/prices", element: <AggregatorPage /> },
    { path: "/contributor", element: <ContributorPage /> },
    { path: "/contributor-requests", element: <ContributorRequestsPage /> },
    { path: "/prices/:componentId", element: <AggregatorOneElement /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "/forbidden", element: <ForbiddenPage /> },
    { path: "/not-found/:prevRoute", element: <NotFoundPage /> }]
    
  return (
    <>
      <ThemeProvider theme={standardTheme}>
        <AuthDialogProvider >
          <Routes>
            {routes.map((route) => {
              return <Route path={ route.path } element={ route.element } />
            })}
          </Routes>
          <SnackbarBlock />
        </AuthDialogProvider>
      </ThemeProvider>
    </>
  );
}


export default App
