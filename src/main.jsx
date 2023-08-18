import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import LoadingCircularProgress from './components/Common/Progress/LoadingCircularProgress';

import './i18n';

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Suspense fallback={(
    <LoadingCircularProgress />)}>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Suspense>
  // </React.StrictMode>
)
