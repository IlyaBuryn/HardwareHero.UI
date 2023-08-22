import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import UserInfoContainer from '../../components/Layout/Profile/UserInfoContainer';
import UserAssembliesContainer from '../../components/Layout/Profile/UserAssembliesContainer';
import SnackbarBlock from '../../components/Common/Snackbar/SnackbarBlock';
import useAuthCheck from '../../hooks/AuthCheck';


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