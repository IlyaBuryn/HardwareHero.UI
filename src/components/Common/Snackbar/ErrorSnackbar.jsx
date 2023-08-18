import React, { useEffect, useState } from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = ({ message, hidden }) => {

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!hidden);
  }, [!hidden]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hidden = !hidden;
    setOpen(!hidden);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
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