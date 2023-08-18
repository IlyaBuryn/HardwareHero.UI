import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import ContributorRequests from '../../Layout/Manager/ContributorRequests';


export default function ContributorRequestsPage() {
  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        
        <ContributorRequests />

        <Footer />

      </ThemeProvider>
  );
}