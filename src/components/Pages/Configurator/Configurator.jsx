import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColors } from '../../../utils/colors';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ConfiguratorMain from '../../Layout/Configurator/ConfiguratorMain';
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