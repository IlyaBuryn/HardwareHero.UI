import React, { useState } from 'react';

import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import UserInfoContainer from '../../components/Layout/Profile/UserInfoContainer';
import UserAssembliesContainer from '../../components/Layout/Profile/UserAssembliesContainer';
import useAuthCheck from '../../hooks/AuthCheck';


const ProfilePage = () => {

  const [isAssembliesListOpen, setIsAssembliesListOpen] = useState(false);
  if (!useAuthCheck()) 
    return false;

  return (
    <>
      <Header />
      <UserInfoContainer onToggleList={() => setIsAssembliesListOpen(!isAssembliesListOpen)}/>
      <UserAssembliesContainer isListOpen={isAssembliesListOpen}/>
      <Footer />
    </>
  );
};


export default ProfilePage;