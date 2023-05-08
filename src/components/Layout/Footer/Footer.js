import { AppBar, Box, Button, Container, Grid, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'

const Footer = () => {
    return (
      <footer>
        <Box sx={{ flexGrow: 1, mt: 'auto' }}>
          <AppBar position='static'>
            <Container>
              <Toolbar>

              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                <Grid xs={6} sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    © 2023 HardwareHero Inc.
                  </Typography>
                </Grid>

                <Grid xs={6} sx={{ textAlign: 'center' }}>
                  <Stack spacing={2} direction='row'>
                    <Button color='inherit'>Privacy Policy</Button>
                    <Button color='inherit'>Terms of Service</Button>
                    <Button color='inherit'>Contact Us</Button>
                  </Stack>
                </Grid>

                <Grid xs={6} sx={{ textAlign: 'center' }}>
                  <Stack spacing={2} direction='column'>
                    <Box>
                      <IconButton color='secondary' onClick={() => { console.log('https://github.com/IlyaBuryn/HardwareHero'); }}>
                        <GitHubIcon sx={{ fontSize: 40 }}/>
                      </IconButton>
                      GitHub
                    </Box>
                  </Stack>
                </Grid>

              </Grid>


              

            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </footer>
  );
}

export default Footer;