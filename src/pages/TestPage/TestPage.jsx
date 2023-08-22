import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';

import { standardTheme } from '../../utils/theme';
import Header from '../../components/Layout/Header/Header';
import { useSnackbarQueue } from '../../components/Common/Snackbar/SnackbarQueue';


export default function TestPage() {

  const enqueueSnackbar = useSnackbarQueue();

  return (
    
    <ThemeProvider theme={standardTheme}>
      
      <Header />
      <Button onClick={() => enqueueSnackbar('Успешное сообщение', 'success')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка успешного снекбара!</Button>
      <Button onClick={() => enqueueSnackbar('Ошибочка', 'error')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка ошибочного снекбара!</Button>
      <Button onClick={() => enqueueSnackbar('Очень большой текст для проверки выхода за границы снекбара', 'error')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка текст в границах снекбара!</Button>
    
    </ThemeProvider>
  );
}