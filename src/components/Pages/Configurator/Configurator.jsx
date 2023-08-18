import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ConfiguratorMain from '../../Layout/Configurator/ConfiguratorMain';
import { useLocation } from 'react-router-dom';


export default function Home() {
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