import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ErrorPage.css';


const UnauthorizedPage = () => {

  const { t, i18n } = useTranslation();

  return (
    <div className="center-container">
      <Alert className="custom-alert" id="warning-alert" severity="warning" sx={{ borderRadius: '23px'}}>
        <h1>{t("Unauthorized.Title")}</h1>
        <p>{t("Unauthorized.Description")}</p>
        <Box className="button-box">
          <Button
            className="custom-button"
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
          >
            {t("Unauthorized.BackToHomePage")}
          </Button>
        </Box>
      </Alert>
    </div>
  );
};


export default UnauthorizedPage;
