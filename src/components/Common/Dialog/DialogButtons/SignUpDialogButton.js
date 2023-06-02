import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SignUpDialog from '../SignUpDialog';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function SignUpDialogButton({ signChange, isOpen }) {

  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(isOpen ?? false);

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = (value) => {
    setIsModalOpen(false);
  };

  const handleChange = () => {
    signChange();
  }

  return (
    <div>

      <Button color='secondary' variant='contained' onClick={handleClickOpen}>{t('SignUp.1')}</Button>

      <SignUpDialog open={isModalOpen} onChange={handleChange} onClose={handleClose} />

    </div>
  );
}

SignUpDialogButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
