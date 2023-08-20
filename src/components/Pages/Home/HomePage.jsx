import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import HomeMain from '../../Layout/Home/HomeMain'
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';
import useExecuteAfterReload from '../../../hooks/ExecuteAfterReload';


const HomePage = () => {

  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useExecuteAfterReload();

  return (
    <ThemeProvider theme={standardTheme}>

      <Header isSignIn={isSignInOpen}/>
      <HomeMain onToggleSignIn={() => setIsSignInOpen(!isSignInOpen)}/>
      <Footer />
      <SnackbarBlock />

    </ThemeProvider>
  );
}


export default HomePage;