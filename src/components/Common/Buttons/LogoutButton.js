import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { logout } from '../../../services/userManager.js';
import { useErrorMessage, ErrorSnackbar } from '../Snackbar/ErrorSnackbar.js';

export default function LogoutButton() {

  const { t, i18n } = useTranslation();
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  

  const handleClick = () => {
    logout(handleErrorMessageChange)
    window.location.reload();
  };

  if (!error.hidden) {
    return (
      <>
        <ErrorSnackbar message={error.message} hidden={error.hidden}/>
        <Button color='inherit' variant='outlined' onClick={handleClick}>{t('Logout.1')}</Button>
      </>
    )
  }

  return (
    <Button color='inherit' variant='outlined' onClick={handleClick}>{t('Logout.1')}</Button>
  );
}