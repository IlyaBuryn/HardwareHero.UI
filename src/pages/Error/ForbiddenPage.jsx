import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ErrorPage.css';


const ForbiddenPage = () => {

  const { t } = useTranslation();

  return (
    <div className="center-container">
      <Alert className="custom-alert" id="error-alert" severity="error" sx={{ borderRadius: '23px'}}>
        <h1>{t("Forbidden.Title")}</h1>
        <p>{t("Forbidden.Description")}</p>
        <Box className="button-box">
          <Button
            className="custom-button"
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
          >
            {t("Forbidden.BackToHomePage")}
          </Button>
        </Box>
      </Alert>
    </div>
  );
};


export default ForbiddenPage;
