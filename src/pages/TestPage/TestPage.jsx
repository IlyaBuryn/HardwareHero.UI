import React from 'react';
import { Button } from '@mui/material';

import Header from '../../components/Layout/Header/Header';
import { useSnackbarQueue } from '../../components/Common/Snackbar/SnackbarQueue';


export default function TestPage() {

  const enqueueSnackbar = useSnackbarQueue();

  return (
    <>
      <Header />
      <Button onClick={() => enqueueSnackbar('Успешное сообщение', 'success')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка успешного снекбара!</Button>
      <Button onClick={() => enqueueSnackbar('Ошибочка', 'error')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка ошибочного снекбара!</Button>
      <Button onClick={() => enqueueSnackbar('Очень большой текст для проверки выхода за границы снекбара', 'error')} sx={{ margin: 10}} variant='contained' color='primary'>Проверка текст в границах снекбара!</Button>
    </>
  );
}