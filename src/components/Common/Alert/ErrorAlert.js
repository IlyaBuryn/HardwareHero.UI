import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';

export const ErrorAlert = ({ message, hidden }) => {

  if (hidden) {
    return null;
  }

  return (
    <Alert sx={{ borderRadius: '10px', width: '300px' }} severity="error">
      <AlertTitle><strong>Error</strong></AlertTitle>{message}
    </Alert>
  );
};

export function useErrorMessage() {
  const [error, setError] = useState({
    hidden: true,
    message: '',
  });

  const handleErrorMessageChange = (str) => {
    setError({ ...error, message: str, hidden: false });
  };

  const clearErrorMessage = () => {
    setError({ ...error, message: '', hidden: true });
  };
  

  return [error, handleErrorMessageChange, clearErrorMessage];
}