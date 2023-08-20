import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LogInDialog from '../../Common/Dialog/LogInDialog';
import SignUpDialog from '../../Common/Dialog/SignUpDialog';

const AuthDialogButtons = ({ isOpenSignInByDefault, isOpenSignUpByDefault }) => {

  const { t } = useTranslation();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(isOpenSignInByDefault ?? false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(isOpenSignUpByDefault ?? false);

  const handleSwitchDialog = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  return (
    <div>
      <Button color='inherit' variant='outlined' onClick={() => setIsSignInModalOpen(true)}>{t('LogIn.1')}</Button>
      <LogInDialog isOpen={isSignInModalOpen} onSwitch={handleSwitchDialog} onClose={() => setIsSignInModalOpen(false)} />

      <Button sx={{ ml: 1 }} color='secondary' variant='contained' onClick={() => setIsSignUpModalOpen(true)}>{t('SignUp.1')}</Button>
      <SignUpDialog isOpen={isSignUpModalOpen} onSwitch={handleSwitchDialog} onClose={() => setIsSignUpModalOpen(false)} />
    </div>
  );
}


export default AuthDialogButtons;