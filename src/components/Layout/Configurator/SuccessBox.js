import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Alert, Button } from '@mui/material';

const SuccessBox = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/home');
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 700,
      }}
    >
      <Alert severity="success">
        Ваша заявка отправлена. Ожидайте подтверждения заявки!
      </Alert>
      
      <Button onClick={() => handleBack()} sx={{ m: 2 }} variant="contained">Домой</Button>
    </Box>
  );
};

export default SuccessBox;
