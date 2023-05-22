import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LogInDialog from '../LogInDialog.js';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LogInDialogButton() {

  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;

    if (pathname === '/login') {
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

      <Button color='inherit' variant='outlined' onClick={handleClickOpen}>{t('LogIn.1')}</Button>

      <LogInDialog open={isModalOpen} onClose={handleClose} />

    </div>
  );
}

LogInDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};