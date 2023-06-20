import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColors } from './../../../utils/colors.js';
import Header from './../../Layout/Header/Header.js'
import Footer from './../../Layout/Footer/Footer.js'
import HomeMain from './../../Layout/Home/HomeMain.js'


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
  return (
    <ThemeProvider theme={theme}>

        <Header />
        
        <HomeMain />

        <Footer />

      </ThemeProvider>
  );
}