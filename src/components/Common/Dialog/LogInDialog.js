import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, IconButton,
   FormGroup, FormControl, FormControlLabel,
   InputLabel, InputAdornment, OutlinedInput,
   DialogTitle, Dialog,
   Divider, Link, Box, Grid, Checkbox } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { ErrorAlert, useErrorMessage } from './../Alert/ErrorAlert';
import { SuccessSnackbar, useSuccessMessage } from '../Snackbar/SuccessSnackbar';
import { signIn } from './../../../services/userManager';

import { themeColors } from './../../../utils/colors.js';
import './Dialog.css'
import { useTranslation } from 'react-i18next';


export default function LogInDialog(props) {

  const lightLinks = createTheme({
    palette: {
      primary: {
        main: themeColors.darkerThanComponentColor.color,
      }
    }
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  
  const [alert, handleSuccessMessageChange, clearSuccessMessage] = useSuccessMessage();
  const { t, i18n } = useTranslation();
  const { onClose, open, onChange } = props;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberLoginChange = (event) => {
    setRememberLogin(event.target.checked);
  };

  const handleClose = () =>  {
    onClose();
  };

  const handleChange = () => {
    onChange();
  }

  const handleClickShowPassword = () => { 
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
 };

  const processLogin = async () => {
    clearErrorMessage();
    setIsLoading(true);
    const callbackMessage = await signIn(username, password, rememberLogin, handleErrorMessageChange);
    await sleep(500);
    setIsLoading(false);
  };

  const processGoogleLogin = async () => {
    clearErrorMessage();
    setIsLoading(true);
    await sleep(500);
    handleErrorMessageChange('Google auth is not available!');
    setIsLoading(false);
  }

  function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 1, p: 2 }}>{t('LogIn.2')}
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

              <Grid item xs={2} alignSelf='center'>
                <ErrorAlert hidden={error.hidden} message={error.message}/>
              </Grid>

              {/* <Grid item xs={2}>
                <Button onClick={processGoogleLogin} fullWidth disabled={isLoading} sx={{ borderRadius: '10px', pr: 10, pl: 10, textTransform: 'none', fontWeight: 'bold' }} variant="outlined" color='secondary' startIcon={<GoogleIcon />}>
                  {isLoading ? t('Loading.1') : t('GoogleLogIn.1')}
                </Button>
              </Grid> */}

              <Grid item xs={2}>
                <Divider variant="middle" color='black' />
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>Email</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel type="text" />
                  <OutlinedInput onChange={handleUsernameChange} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>{t('Password.1')}</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel type="password" autoComplete="current-password" />
                  <OutlinedInput onChange={handlePasswordChange} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type={showPassword ? 'text' : 'password'} endAdornment={
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
                <FormControlLabel onChange={handleRememberLoginChange} control={<Checkbox defaultChecked color='secondary' />} label={t('RememberMe.1')} />
              </Grid>

              <Grid item xs={2}>
                <Button onClick={() => processLogin()} disabled={isLoading} fullWidth sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }} variant='contained' color='secondary'>
                  {isLoading ? t('Loading.1') : t('LogIn.2')}
                </Button>
              </Grid>

              <ThemeProvider theme={lightLinks}>
                <Grid item xs={2} textAlign='center' >
                  <Link sx={{ fontWeight: 'bold' }} href='#' underline="hover">{t('ForgotPassword.1')}</Link>
                </Grid>

                <Grid item xs={2}>
                  <Divider variant="middle" color='black' />
                </Grid>

                <Grid item xs={2} textAlign='center'>
                  <p>{t('HaveAccount.0')}</p>
                  <Link onClick={handleChange} sx={{ fontWeight: 'bold' }}  underline="hover">{t('SignUp.2')}</Link>
                </Grid>
                </ThemeProvider>

            </Grid>

        </Box>

      </FormGroup>
    </Dialog>
  );
}

LogInDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};