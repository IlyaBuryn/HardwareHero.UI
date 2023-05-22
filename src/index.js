import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import LoadingCircularProgress from './components/Common/Progress/LoadingCircularProgress';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={(
        
      <LoadingCircularProgress />)}>

      <BrowserRouter>
        <App /> 
      </BrowserRouter>
      
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();
