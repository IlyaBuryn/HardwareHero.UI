import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, IconButton,
  DialogTitle, Dialog,
  Divider, Link, Box, Grid,
  FormGroup, FormControl, OutlinedInput  } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import PasswordCheck from '../Password/PasswordCheck';

import { ErrorAlert, useErrorMessage } from '../Alert/ErrorAlert';
import { signUp } from '../../../services/userManager';

import { themeColors } from '../../../utils/colors';
import './Dialog.css'
import { useTranslation } from 'react-i18next';

export default function SignUpDialog(props) {

  const lightLinks = createTheme({
    palette: {
      primary: {
        main: themeColors.darkerThanComponentColor.color,
      }
    }
  });

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  
  const { t, i18n } = useTranslation();
  const { onClose, open, onChange } = props;


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
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

  const processRegistration = async () => {
    clearErrorMessage();
    setIsLoading(true);
    await sleep(500);
    const callbackMessage = await signUp(name, username, email, passwordValue, handleErrorMessageChange);
    setIsLoading(false);
  }  

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
      <DialogTitle sx={{ m: 1, p: 2 }}>{t('SignUp.2')}
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
                <Button onClick={processGoogleLogin} disabled={isLoading} fullWidth sx={{ borderRadius: '10px', pr: 10, pl: 10, textTransform: 'none', fontWeight: 'bold' }} variant="outlined" color='secondary' startIcon={<GoogleIcon />}>
                  {isLoading ? t('Loading.1') : t('GoogleLogIn.1')}
                </Button>
              </Grid> */}

              <Grid item xs={2}>
                <Divider variant="middle" color='black' />
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>{t('Fullname.1')}</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <OutlinedInput onChange={handleNameChange} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>{t('Username.1')}</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <OutlinedInput onChange={handleUsernameChange} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>
                <span className='text-field-label'>Email</span>
                <FormControl fullWidth size="small" variant="outlined">
                  <OutlinedInput onChange={handleEmailChange} sx={{ borderRadius: '10px', mt: 1 }} placeholder="example@mail.com" color='secondary' type='text' />
                </FormControl>
              </Grid>

              <Grid item xs={2}>

                <span className='text-field-label'>{t('Password.1')}</span>
                <PasswordCheck password={passwordValue} setPassword={setPasswordValue}/>
                <div id="password_block_check"></div>

              </Grid>

              <Grid item xs={2}>
                <Button onClick={processRegistration} disabled={isLoading} fullWidth sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }} variant='contained' color='secondary'>
                  {isLoading ? t('Loading.1') : t('SignUp.2')}
                </Button>
              </Grid>

              <ThemeProvider theme={lightLinks}>

                <Grid item xs={2}>
                  <Divider variant="middle" color='black' />
                </Grid>

                <Grid item xs={2} textAlign='center'>
                  <p>{t('HaveAccount.1')}</p>
                  <Link onClick={handleChange} sx={{ fontWeight: 'bold' }}  underline="hover">{t('LogIn.2')}</Link>
                </Grid>

              </ThemeProvider>

            </Grid>

        </Box>

      </FormGroup>
    </Dialog>
  );
}

SignUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
