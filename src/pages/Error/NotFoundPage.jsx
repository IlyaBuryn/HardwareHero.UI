import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ErrorPage.css';


const NotFoundPage = () => {

  const { prevRoute } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="center-container">
      <Alert className="custom-alert" id="info-alert" severity="info" sx={{ borderRadius: '23px'}}>
        <h1>{t("NotFound.Title")}</h1>
        <p>{t("NotFound.Description")}</p>
        <Box className="button-box">
          <Button
            onClick={() => navigate(`/${prevRoute}` ?? '/home')}
            className="custom-button"
            variant="contained"
            color="primary"
          >
            {t("NotFound.BackToPrevPage")}
          </Button>
        </Box>
      </Alert>
    </div>
  );
};


export default NotFoundPage;
