import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { handleLogout } from '../../../../helpers/authHelper';


const LogoutButton = () => {

  const { t } = useTranslation();

  return (
    <Button color='inherit' variant='outlined' onClick={handleLogout} >
      {t('Logout.1')}
    </Button>
  );
}


export default LogoutButton;