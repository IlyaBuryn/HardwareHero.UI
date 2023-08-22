import { AppBar, Box, Button, Container, Grid, IconButton, Stack, Toolbar, Typography, Divider, Link } from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from './../../../assets/tmplogo.png';
import './Footer.css'

import { useTranslation } from 'react-i18next';

const buttonFontSizeTheme = createTheme({
  typography: {

    button: {
      fontSize: 16,
      fontWeight: 'bold',
    },    
  }, 
});

const Footer = () => {

  const { t, i18n } = useTranslation();

    return (
      <footer>
        <Box sx={{ flexGrow: 1, mt: 'auto' }}>
          <AppBar position='static'>
            <Container>
              <Toolbar>

              <Grid container justifyContent="center" alignItems="center" direction="row">

                <Grid item xs={12} sx={{  p: 5 }}>
                  <Stack spacing={4} direction='row' justifyContent="center" alignItems="center">
                    <ThemeProvider theme={buttonFontSizeTheme}>

                      <Button color='inherit'>{t('Options.AboutUs')}</Button>
                      <Button color='inherit'>{t('Options.Prices')}</Button>
                      <Button color='inherit'>{t('Options.Account')}</Button>
                      <Button color='inherit'>{t('Options.Contributors')}</Button>
                      <Button color='inherit'>{t('Options.Help')}</Button>
                      <Button color='inherit'>{t('Options.Contacts')}</Button>

                    </ThemeProvider>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Divider variant="middle" sx={{ backgroundColor: 'white' }} />
                </Grid>

                <Grid item xs={4} sx={{ flexGrow: 0, flexShrink: 0, p: 5 }}>
                  <img src={logo} alt='logo' style={{ width: '80%' }} />
                </Grid>

                <Grid item xs={8} sx={{ flexGrow: 1, flexShrink: 1, p: 3 }}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {t('HomeDescription.1')}
                  </Typography>
                </Grid>

                <Grid item xs={12} sx={{  p: 1, pb: 5 }}>
                  <Stack spacing={1} direction='row' justifyContent="center" alignItems="center">

                    <Link href='https://github.com/IlyaBuryn/HardwareHero'>
                      <IconButton color='secondary'>
                        <GitHubIcon sx={{ fontSize: 40 }}/>
                      </IconButton>
                    </Link>

                    <IconButton color='secondary'>
                      <GoogleIcon sx={{ fontSize: 40 }}/>
                    </IconButton>

                    <IconButton color='secondary'>
                      <FacebookIcon sx={{ fontSize: 40 }}/>
                    </IconButton>

                  </Stack>
                </Grid>

              </Grid>


            </Toolbar>
          </Container>

          <Box sx={{ bgcolor: '#832161',
                textAlign: 'center',
                p: 1 }}>

                <Typography sx={{ flexGrow: 1 }}>
                  <span style={{ fontWeight: 'lighter', fontSize: 13 }}>© 2023 Copyright:</span> HardwareHero Inc.
                </Typography>
              </Box>
        </AppBar>
      </Box>
    </footer>
  );
}

export default Footer;