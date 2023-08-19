import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';
import UserInfoContainer from '../../Layout/Profile/UserInfoContainer';
import UserAssembliesContainer from '../../Layout/Profile/UserAssembliesContainer';
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';
import useAuthCheck from '../../../hooks/AuthCheck';


const ProfilePage = () => {

  const [isAssembliesListOpen, setIsAssembliesListOpen] = useState(false);
  if (!useAuthCheck()) 
    return false;

  return (
    <ThemeProvider theme={standardTheme}>

      <Header />
      <UserInfoContainer onToggleList={() => setIsAssembliesListOpen(!isAssembliesListOpen)}/>
      <UserAssembliesContainer isListOpen={isAssembliesListOpen}/>
      <Footer />
      <SnackbarBlock />

    </ThemeProvider>
  );
};


export default ProfilePage;