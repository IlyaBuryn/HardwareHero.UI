import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import HomeMain from '../../Layout/Home/HomeMain'

export default function Home() {
  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        
        <HomeMain />

        <Footer />

      </ThemeProvider>
  );
}