import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Header.css';
import logo from './../../../images/tmplogo.png';

import LogInDialogButton from '../../Common/Dialog/DialogButtons/LogInDialogButton.js';
import SignUpDialogButton from '../../Common/Dialog/DialogButtons/SignUpDialogButton.js';
import LanguageMenu from '../../Common/Menu/LanguageMenu';

import { getUserFromCookie, isSessionUser, getUserRole, checkUserRole } from './../../../services/userManager.js';
import ProfileMenu from './../../Common/Menu/ProfileMenu';
import { SuccessSnackbar, useSuccessMessage } from '../../Common/Snackbar/SuccessSnackbar';
import { ErrorSnackbar, useErrorMessage } from '../../Common/Snackbar/ErrorSnackbar';
import AdminHeader from '../Admin/AdminHeader';
import ManagerHeader from '../Manager/ManagerHeader';

const Header = () => {

  const [userSession, setUserSession] = useState(false);
  const location = useLocation();

  const [alert, handleSuccessMessageChange, clearSuccessMessage] = useSuccessMessage();
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleSignChange = (value) => {
    if (isLoginOpen) {
      setIsLoginOpen(false);
      setIsSignupOpen(true);
    }
    else {
      setIsLoginOpen(true);
      setIsSignupOpen(false);
    }
  };

  useEffect(() => {
    setUserSession(isSessionUser());
  }, []);

  const breadcrumbs = location.pathname.split('/').filter((path) => path !== '');
  const showBreadcrumb = breadcrumbs.length > 0 && breadcrumbs[0] !== 'home';

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const callBackSuccessMessageHandller = async (msg) => {
    // setTimeout(() => {}, 2000);
    // await clearSuccessMessage();
    // await handleSuccessMessageChange(msg)
  }
  
  const showSuccessMessage = async () => {
    const successMessage = localStorage.getItem('successMessage');
    if (successMessage) {
      await clearSuccessMessage();
      await handleSuccessMessageChange(successMessage)
      localStorage.removeItem('successMessage');
    }
  }

  const showErrorMessage = async () => {
    const errorMessage = localStorage.getItem('errorMessage');
    if (errorMessage) {
      await clearErrorMessage();
      await handleErrorMessageChange(errorMessage)
      localStorage.removeItem('errorMessage');
    }
  }

  useEffect(() => {
    showSuccessMessage();
  }, []);

  useEffect(() => {
    showErrorMessage();
  }, []);

  return (
    <>
    {!alert.hidden ? (
      <SuccessSnackbar
        sx={{ margin: '0 auto', mt: 15 }}
        hidden={alert.hidden}
        message={alert.message}
      />
    ) : null}

    {!error.hidden ? (
      <ErrorSnackbar
        sx={{ margin: '0 auto', mt: 15 }}
        hidden={error.hidden}
        message={error.message}
      />
    ) : null}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='fixed'>
          <Container fixed>
            <Toolbar>
              <LanguageMenu />

              <Typography variant='h6' sx={{ flexGrow: 1 }}></Typography>

              <Link to="/home">
                <img className='logo-center' src={logo} alt='logo' />
              </Link>
              <p></p>

              <Stack spacing={2} direction='row' sx={{ marginRight: 'auto' }}>

                <Badge badgeContent={0} sx={{ mt: 1, mr: 1}} color="secondary" showZero max={99}>
                  <FavoriteIcon color="white" />
                </Badge>

                {userSession ? (
                  <>
                    <Stack direction="column">
                      <Typography align='right' variant='body2' flexGrow={1} sx={{ whiteSpace: 'nowrap' }}>имя: {getUserFromCookie().fullName}</Typography>
                      <Typography align='right' variant='body2' flexGrow={1} sx={{ whiteSpace: 'nowrap' }}>роль: {getUserRole()}</Typography>
                    </Stack>
                    <ProfileMenu user={getUserFromCookie()} />
                  </>
                ) : (
                  <>
                    <LogInDialogButton signChange={handleSignChange} isOpen={isLoginOpen} successHandle={callBackSuccessMessageHandller} />
                    <SignUpDialogButton signChange={handleSignChange} isOpen={isSignupOpen} successHandle={callBackSuccessMessageHandller} />
                  </>
                )}
              </Stack>

            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {isSessionUser() && checkUserRole('Admin') ? (
        <Box sx={{ flexGrow: 1, backgroundColor: '#c6b6bf', p: 2, pt: '80px', }}>
          <Container fixed>
            <AdminHeader />
          </Container>
        </Box>
      ) : (
        null
      )}

      {isSessionUser() && checkUserRole('Manager') ? (
        <Box sx={{ flexGrow: 1, backgroundColor: '#bcbcc7', p: 2 }}>
          <Container fixed>
            <ManagerHeader />
          </Container>
        </Box>
      ) : (
        null
      )}

      {showBreadcrumb && (
        <Box sx={{ flexGrow: 1, backgroundColor: 'lightgray', pb: 1, p: 3, mt: checkUserRole('Admin') || checkUserRole('Manager') ? 0 : 6  }}>
          <Container fixed>
            <Toolbar>
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
                  Home
                </Typography>
              </Link>

              {breadcrumbs.map((path, index) => (
                <React.Fragment key={index}>
                  <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
                    &gt;
                  </Typography>
                  <Link to={`/${path}`} style={{ textDecoration: 'none' }}>
                    <Typography variant='body1' sx={{ color: 'black', marginRight: '16px' }}>
                      {capitalizeFirstLetter(path)}
                    </Typography>
                  </Link>
                </React.Fragment>
              ))}
            </Toolbar>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Header;
