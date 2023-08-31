import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import './Header.css';
import LeftNavControls from './HeaderControls/LeftNavControls';
import NavLogo from './HeaderControls/NavLogo';
import RightNavControls from './HeaderControls/RightNavControls';
import Breadcrumb from './Breadcrumb/Breadcrumb';


const Header = ({ breadcrumbItems }) => {

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'secondary.main' }}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>

            <LeftNavControls />
            <NavLogo />
            <RightNavControls />

          </Toolbar>
        </Container>
      </AppBar>

      {breadcrumbItems ? (
      <Container fixed sx={{ flexGrow: 1, paddingTop: '64px' }}>
        <Toolbar>
          <Breadcrumb items={breadcrumbItems}/>
        </Toolbar>
      </Container>
      ) : null}

    </Box>
  );
}


export default Header;