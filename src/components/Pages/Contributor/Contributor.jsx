import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


import { themeColors } from '../../../utils/colors';


import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'


import { checkUserRole, getUserFromCookie, getUserRole, isSessionUser } from '../../../services/userManager';
import SignUpDialog from '../../Common/Dialog/SignUpDialog';
import LogInDialog from '../../Common/Dialog/LogInDialog';
import ContributorSignUp from '../../Layout/Contributor/ContributorSignUp';
import ContributorMenu from '../../Layout/Contributor/ContributorMenu';


const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanBackColor.color,
    },
    secondary: {
      main: themeColors.darkerThanComponentColor.color,
      light: themeColors.componentColor.color,
    },   
  }
});


export default function Contributor() {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const navigate = useNavigate();
  
  const handleChange = (value) => {
    if (isLoginOpen) {
      setIsLoginOpen(false);
      setIsSignupOpen(true);
    }
    else {
      setIsLoginOpen(true);
      setIsSignupOpen(false);
    }
  };


  return (
    <ThemeProvider theme={theme}>

        <Header />
        
        {isSessionUser() ? (
          <>
            {checkUserRole('Contributor') ? (
              <>
                <ContributorMenu />
              </>
            ) : (
              <>
                <ContributorSignUp />
              </>
            )}
            <Footer />
          </>
        ) : (
          <>
            <LogInDialog open={isLoginOpen} onChange={handleChange} onClose={() => navigate(-1)} />
            <SignUpDialog open={isSignupOpen} onChange={handleChange}  onClose={() => navigate(-1)} />
          </>
        )}


      </ThemeProvider>
  );
}