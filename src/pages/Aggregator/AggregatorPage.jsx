import React from 'react';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import AggregatorItems from '../../components/Layout/Aggregator/AggregatorItems';


const AggregatorPage = () => {

  return (
    <>
      <Header breadcrumbItems={[{ label: 'Home', url: '/' },{ label: 'Aggregator' }]}/>
      <AggregatorItems />
      <Footer />
    </>
  );
}


export default AggregatorPage;