import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import { checkUserRole, isSessionUser } from '../../../services/userManager';
import ContributorSignUp from '../../Layout/Contributor/ContributorSignUp';
import ContributorMenu from '../../Layout/Contributor/ContributorMenu';
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';
import useAuthCheck from '../../../hooks/AuthCheck';

const ContributorPage = () => {

  if (!useAuthCheck()) 
    return false;

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        {checkUserRole('Contributor') ? <ContributorMenu /> : <ContributorSignUp />}
        <Footer />
        <SnackbarBlock />

    </ThemeProvider>
  );
}


export default ContributorPage