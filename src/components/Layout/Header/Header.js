import { AppBar, Box, Button, Container, IconButton, ImageList, ImageListItem, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import logo from './../../../images/tmplogo.png'
import LogInDialogButton from '../../Common/Dialog/LogInDialog';
import SignUpDialogButton from '../../Common/Dialog/SignUpDialog';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>

            <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography variant='h6' sx={{ flexGrow: 1 }}></Typography>

            <img className='logo-center' src={logo} alt='logo' />

            <Stack spacing={2} direction='row'>

              <LogInDialogButton />
              <SignUpDialogButton />

            </Stack>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;