import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SignUpDialog from '../SignUpDialog';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function SignUpDialogButton() {

  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    if (pathname === '/signup') {
      setIsModalOpen(true);
    }
  }, []);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = (value) => {
    setIsModalOpen(false);
  };

  return (
    <div>

      <Button color='secondary' variant='contained' onClick={handleClickOpen}>{t('SignUp.1')}</Button>

      <SignUpDialog open={isModalOpen} onClose={handleClose} />

    </div>
  );
}

SignUpDialogButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
