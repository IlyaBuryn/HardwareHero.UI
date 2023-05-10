import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColors } from './utils/colors.js';
import Header from './components/Layout/Header/Header.js';
import Footer from './components/Layout/Footer/Footer.js';
import HomeMain from './components/Layout/Home/HomeMain.js';

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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>

        <Header />
        
        <HomeMain />

        <Footer />

      </ThemeProvider>
    </>
  );
}

export default App;
