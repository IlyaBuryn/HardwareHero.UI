import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import AggregatorItems from '../../Layout/Aggregator/AggregatorItems';
import SnackbarBlock from '../../Common/Snackbar/SnackbarBlock';


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