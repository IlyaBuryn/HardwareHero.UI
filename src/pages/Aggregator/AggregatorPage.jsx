import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import AggregatorItems from '../../components/Layout/Aggregator/AggregatorItems';


const AggregatorPage = () => {

  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        <AggregatorItems />
        <Footer />

      </ThemeProvider>
  );
}


export default AggregatorPage;