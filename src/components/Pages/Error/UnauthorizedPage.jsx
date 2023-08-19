import { Alert, Button, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Alert
        sx={{
          width: 'auto',
          margin: '0 auto',
          border: '1px solid orange',
          borderRadius: '10px',
          textAlign: 'center',
          padding: '16px',
          paddingRight: '30px'
        }}
        severity="warning"
      >
        <h1 style={{ margin: 0 }}>Ошибка 401: Не авторизован</h1>
        <p style={{ margin: '8px 0' }}>Для доступа к этой странице необходимо войти в аккаунт.</p>
        <Box Box sx={{ textAlign: 'center', marginTop: '16px' }}> {/* Контейнер для выравнивания кнопки */}
          <Button
            sx={{ m: 2}}
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
          >
            Перейти на главную страницу
          </Button>
        </Box>
      </Alert>
    </div>
  );
};

export default UnauthorizedPage;
