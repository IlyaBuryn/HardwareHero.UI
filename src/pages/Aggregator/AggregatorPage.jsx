import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import AggregatorItems from '../../components/Layout/Aggregator/AggregatorItems';
import SnackbarBlock from '../../components/Common/Snackbar/SnackbarBlock';


const AggregatorPage = () => {

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        <AggregatorItems />
        <Footer />
        <SnackbarBlock />

      </ThemeProvider>
  );
}


export default AggregatorPage;