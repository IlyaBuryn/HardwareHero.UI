import React, { useEffect, useState } from 'react';
import { Stack, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SuccessSnackbar = ({ message, hidden }) => {

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
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export function useSuccessMessage() {
  const [alert, setAlert] = useState({
    hidden: true,
    message: '',
  });

  const handleSuccessMessageChange = (str) => {
    setAlert({ ...alert, message: str, hidden: false });
  };

  const clearSuccessMessage = () => {
    setAlert({ ...alert, message: '', hidden: true });
  };
  

  return [alert, handleSuccessMessageChange, clearSuccessMessage];
}