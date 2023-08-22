import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import ConfiguratorMain from '../../components/Layout/Configurator/ConfiguratorMain';


const ConfiguratorPage = () => {

  const location = useLocation();
  const { readyComponents } = location.state ?? [];

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        <ConfiguratorMain readyComponents={readyComponents}/>
        <Footer />

      </ThemeProvider>
  );
}


export default ConfiguratorPage;