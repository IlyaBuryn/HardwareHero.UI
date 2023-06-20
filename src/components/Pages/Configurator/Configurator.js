import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColors } from './../../../utils/colors.js';
import Header from './../../Layout/Header/Header.js'
import Footer from './../../Layout/Footer/Footer.js'
import ConfiguratorMain from '../../Layout/Configurator/ConfiguratorMain.js';
import { useLocation } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanBackColor.color,
    },
    secondary: {
      main: themeColors.darkerThanComponentColor.color,
      light: themeColors.componentColor.color,
    },   
  }
});


export default function Home() {
  const location = useLocation();
  const { readyComponents } = location.state ?? [];

  return (
    <ThemeProvider theme={theme}>

        <Header />
        
        <ConfiguratorMain readyComponents={readyComponents}/>

        <Footer />

      </ThemeProvider>
  );
}