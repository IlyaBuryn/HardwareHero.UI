import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './Alert.css';


export const AlertComponent = () => {

  const { t } = useTranslation();
  const [currentAlert, setCurrentAlert] = useState(null);

  useEffect(() => {
    const handleAddAlert = (event) => {
      const { message, type } = event.detail;
      addAlert(message, type);
    };

    const alertRoot = document.getElementById('alert-root');
    alertRoot.addEventListener('add-alert', handleAddAlert);

    return () => {
      alertRoot.removeEventListener('add-alert', handleAddAlert);
    };
  }, []);

  const addAlert = (message, type) => {
    setCurrentAlert({ message, type, id: Date.now(), hidden: false });
  };

  const hideAlert = () => {
    setCurrentAlert(null);
  };

  if (!currentAlert) {
    return null;
  }

  const { message, type, id } = currentAlert;

  return (
    <Alert
      sx={{ borderRadius: 4,
        borderColor:
          type === 'success'
            ? '#4caf50'
            : type === 'error'
            ? '#e5350'
            : type === 'warning'
            ? '#ff9800'
            : '#03a9f4',
      }}
      key={id}
      className="alert-message"
      severity={type}
      onClose={hideAlert}
    >
      <AlertTitle>
        <strong>
          {type === 'error'
            ? t('Alert.Error')
            : type === 'success'
            ? t('Alert.Success')
            : type === 'warning'
            ? t('Alert.Warning')
            : t('Alert.Info')}
        </strong>
      </AlertTitle>
      {message}
    </Alert>
  );
};


export const useAlert = () => {
  const addAlert = (message, type) => {
    const alertRoot = document.getElementById('alert-root');
    if (alertRoot) {
      const newEvent = new CustomEvent('add-alert', {
        detail: { message, type },
      });
      alertRoot.dispatchEvent(newEvent);
    }
  };

  return addAlert;
};
