import React from 'react';

import Header from '../../components/Layout/Header/Header'
import Footer from '../../components/Layout/Footer/Footer'
import ContributorRequests from '../../components/Layout/Manager/ContributorRequests';
import useAuthCheck from '../../hooks/AuthCheck';
import useRoleCheck from '../../hooks/RoleCheck';


const ContributorRequestsPage = () => {

  if (!useAuthCheck()) 
    return false;

  if (!useRoleCheck())
    return false;

  return (
    <>
      <Header />
      <ContributorRequests />
      <Footer />
    </>
  );
}


export default ContributorRequestsPage;