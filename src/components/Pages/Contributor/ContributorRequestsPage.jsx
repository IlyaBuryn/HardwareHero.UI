import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ContributorRequests from '../../Layout/Manager/ContributorRequests';
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';
import useAuthCheck from '../../../hooks/AuthCheck';
import useRoleCheck from '../../../hooks/RoleCheck';


const ContributorRequestsPage = () => {

  if (!useAuthCheck()) 
    return false;

  if (!useRoleCheck())
    return false;

  return (
    <ThemeProvider theme={standardTheme}>

      <Header />
      <ContributorRequests />
      <Footer />
      <SnackbarBlock />

    </ThemeProvider>
  );
}


export default ContributorRequestsPage;