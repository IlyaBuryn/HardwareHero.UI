import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { Button, IconButton,
  DialogTitle, Dialog,
  Divider, Link, Box, Grid,
  FormGroup, FormControl, OutlinedInput  } from '@mui/material';

import PasswordCheck from '../Password/PasswordCheck';
import { useUserManager } from '../../../services/userManager';
import './Dialog.css'
import AlertBlock from '../Alert/AlertBlock';
import { lightLinks } from '../../../utils/theme';
import { useAlert } from '../Alert/Alert';
import { useSnackbarBeforeReload } from '../Snackbar/SnackbarQueue';
import { useAuthDialog } from './AuthDialogContext';

const SignUpDialog = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const addAlert = useAlert();
  const enqueueSnackbarReload = useSnackbarBeforeReload();
  const { isSignInModalOpen, setIsSignInModalOpen, isSignUpModalOpen, setIsSignUpModalOpen } = useAuthDialog();
  const userManager = useUserManager();

  const processRegistration = async () => {
    setIsLoading(true);
    const callbackMessage = await userManager.signUp(name, username, email, passwordValue);
    setIsLoading(false);

    if (callbackMessage.type === 'error') {
      addAlert(callbackMessage.message, callbackMessage.type)
    }
    else {
      enqueueSnackbarReload(callbackMessage.message, callbackMessage.type);
      window.location.reload()
    }
  }  

  const handleSwitchDialog = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
    setIsSignUpModalOpen(!isSignUpModalOpen);
  }

  const handleCloseDialog = () => {
    setIsSignUpModalOpen(false)
  }


  return (
    <Dialog onClose={handleCloseDialog} open={isSignUpModalOpen}>
      <DialogTitle sx={{ m: 1, p: 2 }}>{t('SignUp.2')}
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
              <span className='text-field-label'>{t('Fullname.1')}</span>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput onChange={(e) => setName(e.target.value)} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <span className='text-field-label'>{t('Username.1')}</span>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput onChange={(e) => setUsername(e.target.value)} sx={{ borderRadius: '10px', mt: 1 }} color='secondary' type='text' />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <span className='text-field-label'>Email</span>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput onChange={(e) => setEmail(e.target.value)} sx={{ borderRadius: '10px', mt: 1 }} placeholder="example@mail.com" color='secondary' type='text' />
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
                <Link onClick={handleSwitchDialog} sx={{ fontWeight: 'bold' }}  underline="hover">{t('LogIn.2')}</Link>
              </Grid>
            </ThemeProvider>
          </Grid>
        </Box>
      </FormGroup>
    </Dialog>
  );
}

export default SignUpDialog;