import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import './HomeMain.css';
import MainCircleRowLinks from '../../Common/Home/MainCircleRowLinks';

import { useTranslation } from 'react-i18next';

const HomeMain = ({ onToggleSignIn }) => {

  const { t, i18n } = useTranslation();

  return(
    <main>
    <Paper sx={{
        position: "relative",
        color: (theme) => theme.palette.common.white,
        mb: 4,
        p: 25,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }} style={{ backgroundImage: `url(https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2018/11/dark-wallpapers.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5)`}} >
      <Container fixed>

        <div sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          bgcolor: "rgba(0,0,0,0.3)"
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

              <Typography variant='h6' color='inherit' sx={{ width: 600}} paragraph>
                {t("HomeDescription.1")}
              </Typography>

              <Button variant='contained' color='secondary'>
                {t('Options.LearnMore')}
              </Button>

            </div>
          </Grid>
        </Grid>
        
      </Container>
    </Paper>

    <MainCircleRowLinks onToggleSignIn={onToggleSignIn}/>
    
  </main>
  );
}

export default HomeMain;