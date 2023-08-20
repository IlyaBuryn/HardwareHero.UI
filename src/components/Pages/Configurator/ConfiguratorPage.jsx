import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ConfiguratorMain from '../../Layout/Configurator/ConfiguratorMain';
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';


const ConfiguratorPage = () => {

  const location = useLocation();
  const { readyComponents } = location.state ?? [];

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        <ConfiguratorMain readyComponents={readyComponents}/>
        <Footer />
        <SnackbarBlock />

      </ThemeProvider>
  );
}


export default ConfiguratorPage;