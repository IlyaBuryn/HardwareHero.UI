import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import './Header.css';
import logo from './../../../images/tmplogo.png'

import LogInDialogButton from '../../Common/Dialog/DialogButtons/LogInDialogButton.js';
import SignUpDialogButton from '../../Common/Dialog/DialogButtons/SignUpDialogButton.js';
import LanguageMenu from '../../Common/Menu/LanguageMenu';

import { checkAccessTokenExpire, getUserFromCookie } from './../../../services/userManager.js';
import LogoutButton from '../../Common/Buttons/LogoutButton';

const Header = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>

            <LanguageMenu />

            <Typography variant='h6' sx={{ flexGrow: 1 }}></Typography>

            <Link to="/home">
              <img className='logo-center' src={logo} alt='logo' />
            </Link>

            <Stack spacing={2} direction='row'>
            {
              user && user.accessToken && user.userName && !checkAccessTokenExpire() ? (
                <>
                  <p>{user.userName}</p>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <LogInDialogButton />
                  <SignUpDialogButton />
                </>
              )
            }


            </Stack>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;