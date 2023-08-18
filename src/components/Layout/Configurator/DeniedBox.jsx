import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Alert, Button, Stack } from '@mui/material';

import { deleteContributor } from '../../../services/contributorManager';
import { useErrorMessage, ErrorSnackbar } from '../../Common/Snackbar/ErrorSnackbar';

export default function DeniedBox({ contrId }) {
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  
  const [contributorId, setContributorId] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();


  const handleDeleteContributor = async () => {
    const response = await deleteContributor(handleErrorMessageChange, contributorId);
    if (response) {
      navigate('/home');
    }
  }

  const handleToHome = () => {
    navigate('/home');
    localStorage.setItem('successMessage', 'Вы успешно удалили свою заявку!')
  }

  useEffect(() => {
    setContributorId(contrId);
  }, []);


  return (
    <>
      {!error.hidden ? (
        <ErrorSnackbar
          sx={{ margin: '0 auto', mt: 15 }}
          hidden={error.hidden}
          message={error.message}
        />
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 700,
        }}
      >
        <Alert severity="error">
          Ваша заявка отклонена.
        </Alert>
        
        <Stack direction='row' alignContent='center' justifyContent='center' spacing={2}>
          <Button onClick={handleToHome} sx={{ mt: 2 }} variant="contained">Домой</Button>
          <Button onClick={handleDeleteContributor} sx={{ mt: 2 }} variant="contained">Удалить заявку!</Button>
        </Stack>

      </Box>
    </>
  );
};