import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, IconButton, DialogTitle, Dialog, Divider, Link, Box, Grid, FormGroup, FormControl, OutlinedInput  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import PasswordCheck from '../Password/PasswordCheck.js';
import { themeColors } from './../../../utils/colors.js';
import './Dialog.css'

export default function SignUpDialogButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>

      <Button color='secondary' variant='contained' onClick={handleClickOpen}>Sign Up</Button>

      <SignUpDialog open={open} onClose={handleClose} />

    </div>
  );
}

SignUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function SignUpDialog(props) {

  const lightLinks = createTheme({
    palette: {
      primary: {
        main: themeColors.darkerThanComponentColor.color,
      }
    }
  });

  const { onClose, open } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClose = () => onClose();

  const handleListItemClick = (value) => onClose(value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 1, p: 2 }}>Sign up
        {onClose ? (
          <IconButton
            aria-label="close"
            variant="outlined"
            onClick={onClose}
            sx={{
              border: '1px solid',
              borderColor: 'currentColor',
              position: 'absolute',
              right: 15,
              top: 15,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon sx={{ fontSize: 15 }} />
          </IconButton>
        ) : null}
      </DialogTitle>

      <FormGroup>

        <Box sx={{ flexGrow: 1, mt: 'auto', p: 3, pt: 0 }}>

            <Grid container direction='column' justifyContent="center" spacing={{ xs: 2 }}>

              <Grid item xs={2}>
                <Button fullWidth sx={{ borderRadius: '10px', pr: 10, pl: 10, textTransform: 'none', fontWeight: 'bold' }} variant="outlined" color='secondary' startIcon={<GoogleIcon />}>
                  Log In with Google
                </Button>
              </Grid>

              <Grid item xs={2}>
                <Divider variant="middle" color='black' />
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>Name</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <OutlinedInput sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>Email</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <OutlinedInput sx={{ borderRadius: '10px', mt: 1 }} placeholder="example@mail.com" color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>

                <span className='text-field-label'>Password</span>
                <PasswordCheck />
                <div id="password_block_check"></div>

              </Grid>

              <Grid item xs={2}>
                <Button fullWidth sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }} variant='contained' color='secondary'>
                  Sign up
                </Button>
              </Grid>

              <ThemeProvider theme={lightLinks}>

                <Grid item xs={2}>
                  <Divider variant="middle" color='black' />
                </Grid>

                <Grid item xs={2} textAlign='center'>
                  <p>Already have an account?</p>
                  <Link sx={{ fontWeight: 'bold' }} href='#' underline="hover">Log in</Link>
                </Grid>

              </ThemeProvider>

            </Grid>

        </Box>

      </FormGroup>
    </Dialog>
  );
}
