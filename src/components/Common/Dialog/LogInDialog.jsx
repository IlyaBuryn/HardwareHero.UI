import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, IconButton,
  FormGroup, FormControl, FormControlLabel,
  InputLabel, InputAdornment, OutlinedInput,
  DialogTitle, Dialog,
  Divider, Link, Box, Grid, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useUserManager } from '../../../services/userManager';
import './Dialog.css'
import AlertBlock from '../Alert/AlertBlock';
import { useAlert } from '../Alert/Alert';
import { useSnackbarBeforeReload } from '../Snackbar/SnackbarQueue';
import { lightLinks } from '../../../utils/theme';
import { useAuthDialog } from './AuthDialogContext';


const LogInDialog = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const addAlert = useAlert();
  const enqueueSnackbarReload = useSnackbarBeforeReload();
  const { isSignInModalOpen, setIsSignInModalOpen, isSignUpModalOpen, setIsSignUpModalOpen } = useAuthDialog();
  const userManager = useUserManager();

  const processLogin = async () => {
    setIsLoading(true);
    const callbackMessage = await userManager.signIn(username, password, rememberLogin);
    setIsLoading(false);

    if (callbackMessage.type === 'error') {
      addAlert(callbackMessage.message, 'error')
    }
    else {
      enqueueSnackbarReload(callbackMessage.message, callbackMessage.type);
      window.location.reload()
    }
  };

  const handleSwitchDialog = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const handleCloseDialog = () => {
    setIsSignInModalOpen(false)
  }
  

  return (
    <Dialog onClose={handleCloseDialog} open={isSignInModalOpen}>
      <DialogTitle sx={{ m: 1, p: 2 }}>{t('LogIn.2')}
        {handleCloseDialog && (
          <IconButton
            aria-label="close"
            variant="outlined"
            onClick={handleCloseDialog}
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
        )}
      </DialogTitle>

      <FormGroup>
        <Box sx={{ flexGrow: 1, mt: 'auto', p: 3, pt: 0 }}>
          <Grid container direction='column' justifyContent="center" spacing={{ xs: 2 }}>
            <Grid item xs={2} alignSelf='center'>
              <AlertBlock />
            </Grid>
            <Grid item xs={2}>
              <Divider variant="middle" color='black' />
            </Grid>
            <Grid item xs={2}>
              <span className='text-field-label'>Email</span>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel type="text" />
                <OutlinedInput onChange={(e) => setUsername(e.target.value)} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <span className='text-field-label'>{t('Password.1')}</span>
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel type="password" autoComplete="current-password" />
                <OutlinedInput onChange={(e) => setPassword(e.target.value)} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type={showPassword ? 'text' : 'password'} endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
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
              <FormControlLabel onChange={(e) => setRememberLogin(e.target.checked)} control={<Checkbox defaultChecked color='secondary' />} label={t('RememberMe.1')} />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={processLogin} disabled={isLoading} fullWidth sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 'bold' }} variant='contained' color='secondary'>
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
                <Link onClick={handleSwitchDialog} sx={{ fontWeight: 'bold' }} underline="hover">{t('SignUp.2')}</Link>
              </Grid>
            </ThemeProvider>
          </Grid>
        </Box>
      </FormGroup>
    </Dialog>
  );
}

export default LogInDialog;