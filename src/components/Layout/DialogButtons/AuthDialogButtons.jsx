import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LogInDialog from '../../Common/Dialog/LogInDialog';
import SignUpDialog from '../../Common/Dialog/SignUpDialog';
import { useAuthDialog } from '../../Common/Dialog/AuthDialogContext';


const AuthDialogButtons = () => {

  const { t } = useTranslation();
  const { setIsSignInModalOpen, setIsSignUpModalOpen } = useAuthDialog();

  return (
    <div>
      <Button color='inherit' variant='outlined' onClick={() => setIsSignInModalOpen(true)}>{t('LogIn.1')}</Button>
      <Button sx={{ ml: 1 }} color='secondary' variant='contained' onClick={() => setIsSignUpModalOpen(true)}>{t('SignUp.1')}</Button>
      
      <LogInDialog />
      <SignUpDialog />
    </div>
  );
}


export default AuthDialogButtons;