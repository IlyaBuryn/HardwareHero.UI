import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import ConfiguratorMain from '../../components/Layout/Configurator/ConfiguratorMain';


const ConfiguratorPage = () => {

  // TODO: Use context?
  const location = useLocation();
  const { readyComponents } = location.state ?? [];

  return (
    <>
      <Header breadcrumbItems={[{ label: 'Home', url: '/' },{ label: 'Configurator' }]}/>
      <ConfiguratorMain readyComponents={readyComponents}/>
      <Footer />
    </>
  );
}


export default ConfiguratorPage;