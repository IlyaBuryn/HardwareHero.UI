import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import HomeMainInfo from '../../components/Layout/Home/HomeMainInfo';
import HomeMainFunctions from '../../components/Layout/Home/HomeMainFunctions';


const HomePage = () => {

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <ThemeProvider theme={standardTheme}>

        <Header isSignIn={isSignInOpen}/>
        <HomeMainInfo />
        <HomeMainFunctions onToggleSignIn={() => setIsSignInOpen(true)}/>
        <Footer />

    </ThemeProvider>
  );
}


export default HomePage;