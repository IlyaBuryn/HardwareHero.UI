import React from 'react';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './HomeMain.css';


const HomeMainInfo = () => {

  const { t } = useTranslation();

  return (
    <Paper className="paper-bg">
      <Container fixed>
        <div className="overlay" />
        <Grid container>
          <Grid item md={6}>
            <div className="content">
              <Typography component="h1" variant="h3" color="white" gutterBottom>
                HardwareHero
              </Typography>
              <Typography variant="h6" color="white" className="description" paragraph>
                {t('HomeDescription.1')}
              </Typography>
              <Button variant="contained" color="secondary">
                {t('Options.LearnMore')}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default HomeMainInfo;
