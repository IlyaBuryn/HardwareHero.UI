import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import { checkUserRole } from '../../services/userManager';
import ContributorSignUp from '../../components/Layout/Contributor/ContributorSignUp';
import ContributorMenu from '../../components/Layout/Contributor/ContributorMenu';
import useAuthCheck from '../../hooks/AuthCheck';


const ContributorPage = () => {

  if (!useAuthCheck()) 
    return false;

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        {checkUserRole('Contributor') ? <ContributorMenu /> : <ContributorSignUp />}
        <Footer />

    </ThemeProvider>
  );
}


export default ContributorPage