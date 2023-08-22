import React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';

import './Header.css';
import LeftHeaderControls from './HeaderControls/LeftHeaderControls';
import MiddleHeaderLogo from './HeaderControls/MiddleHeaderLogo';
import RightHeaderControls from './HeaderControls/RightHeaderControls';
import Breadcrumb from './Breadcrumb/Breadcrumb';


const Header = ({ breadcrumbItems }) => {

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'secondary.main' }}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>

            <LeftHeaderControls />
            <MiddleHeaderLogo />
            <RightHeaderControls />

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