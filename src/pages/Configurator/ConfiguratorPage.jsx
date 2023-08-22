import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import ConfiguratorMain from '../../components/Layout/Configurator/ConfiguratorMain';


const ConfiguratorPage = () => {

  const location = useLocation();
  const { readyComponents } = location.state ?? [];

  return (
    <>
      <Header />
      <ConfiguratorMain readyComponents={readyComponents}/>
      <Footer />
    </>
  );
}


export default ConfiguratorPage;