import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import HomeMain from '../../components/Layout/Home/HomeMain'


const HomePage = () => {

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <ThemeProvider theme={standardTheme}>

      <Header isSignIn={isSignInOpen}/>
      <HomeMain onToggleSignIn={() => setIsSignInOpen(!isSignInOpen)}/>
      <Footer />

    </ThemeProvider>
  );
}


export default HomePage;