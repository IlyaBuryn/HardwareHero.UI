import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { themeColors } from './utils/colors.js';
import Header from './components/Layout/Header/Header.js'
import Footer from './components/Layout/Footer/Footer.js';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanBackColor.color,
    },
    secondary: {
      main: themeColors.darkerThanComponentColor.color,
      light: themeColors.componentColor,
    },   
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        
        <main>
          <Paper sx={{
              position: "relative",
              color: (theme) => theme.palette.common.white,
              mb: 4,
              p: 25,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }} style={{ backgroundImage: `url(https://source.unsplash.com/featured)`}} >

            <Container fixed>

              <div sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.3)"
              }}/>

              <Grid container>

                <Grid item md={6}>
                  
                  <div sx={{
                    position: "relative",
                    p: 9,
                  }}>

                    <Typography component='h1' variant='h3' color='inherit' gutterBottom>
                      HardwareHero
                    </Typography>

                    <Typography variant='h5' color='inherit' paragraph>
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </Typography>

                    <Button variant='contained' color='secondary'>
                      Learn more
                    </Button>

                  </div>
                </Grid>
              </Grid>
              
            </Container>
          </Paper>
        </main>

        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
