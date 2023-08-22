import React from 'react';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import { checkUserRole } from '../../services/userManager';
import ContributorSignUp from '../../components/Layout/Contributor/ContributorSignUp';
import ContributorMenu from '../../components/Layout/Contributor/ContributorMenu';
import useAuthCheck from '../../hooks/AuthCheck';


const ContributorPage = () => {

  if (!useAuthCheck()) 
    return false;

  return (
    <>
      <Header breadcrumbItems={[{ label: 'Home', url: '/' },{ label: 'Contributors' }]}/>
      {checkUserRole('Contributor') ? <ContributorMenu /> : <ContributorSignUp />}
      <Footer />
    </>
  );
}


export default ContributorPage