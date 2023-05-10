import React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, IconButton, DialogTitle, Dialog, Divider, Link, Box, Grid, FormGroup, FormControl, FormControlLabel, Checkbox, InputLabel, InputAdornment, OutlinedInput  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { themeColors } from './../../../utils/colors.js';
import './Dialog.css'

export default function LogInDialogButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>

      <Button color='inherit' variant='outlined' onClick={handleClickOpen}>Log In</Button>

      <LogInDialog open={open} onClose={handleClose} />

    </div>
  );
}

LogInDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

function LogInDialog(props) {

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
      <DialogTitle sx={{ m: 1, p: 2 }}>Log in
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
                <span className='text-field-label'>Email</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel type="text" />
                  <OutlinedInput sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>Password</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel type="password" autoComplete="current-password" />
                  <OutlinedInput sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type={showPassword ? 'text' : 'password'} endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <FormControlLabel control={<Checkbox defaultChecked color='secondary' />} label="Remember me" />
              </Grid>

              <Grid item xs={2}>
                <Button fullWidth sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }} variant='contained' color='secondary'>
                  Log in
                </Button>
              </Grid>

              <ThemeProvider theme={lightLinks}>
                <Grid item xs={2} textAlign='center' >
                  <Link sx={{ fontWeight: 'bold' }} href='#' underline="hover">Forgot Password?</Link>
                </Grid>

                <Grid item xs={2}>
                  <Divider variant="middle" color='black' />
                </Grid>

                <Grid item xs={2} textAlign='center'>
                  <p>Don't have an account?</p>
                  <Link sx={{ fontWeight: 'bold' }} href='#' underline="hover">Sign up</Link>
                </Grid>
                </ThemeProvider>

            </Grid>

        </Box>

      </FormGroup>
    </Dialog>
  );
}
