import React, { useState } from 'react';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import HomeMainInfo from '../../components/Layout/Home/HomeMainInfo';
import HomeMainFunctions from '../../components/Layout/Home/HomeMainFunctions';


const HomePage = () => {

  return (
    <>
      <Header/>
      <HomeMainInfo />
      <HomeMainFunctions />
      <Footer />
    </>
  );
}


export default HomePage;