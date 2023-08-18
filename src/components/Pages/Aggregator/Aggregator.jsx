import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { standardTheme } from '../../../utils/theme';
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import AggregatorItems from '../../Layout/Aggregator/AggregatorItems';

export default function Aggregator() {
  return (
    <ThemeProvider theme={standardTheme}>

        <Header />
        
        <AggregatorItems />

        <Footer />

      </ThemeProvider>
  );
}