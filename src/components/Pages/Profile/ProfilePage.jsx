import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeColors } from '../../../utils/colors';
import { Container, Typography, TextField, Button, Stack, Paper, Box, Tooltip, IconButton, Avatar, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../../Layout/Header/Header';
import Footer from '../../Layout/Footer/Footer';

import LogoutButton from '../../Common/Buttons/LogoutButton';
import { getUserFromCookie, isSessionUser } from '../../../services/userManager';

import { useTranslation } from 'react-i18next';
import MyAssemblies from '../../Layout/Assemblies/MyAssemblies';
import { getAssembliesByUserId } from '../../../services/assemblyManager';
import { useErrorMessage, ErrorSnackbar } from '../../Common/Snackbar/ErrorSnackbar';

const theme = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanBackColor.color,
    },
    secondary: {
      main: themeColors.darkerThanComponentColor.color,
      light: themeColors.componentColor.color,
    },
  },
});

const ProfilePage = () => {
  const location = useLocation();
  const { openAssemblies } = location.state ?? false;
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();
  const [assembliesHidden, setAssembliesHidden] = useState(true);
  const [assemblies, setAssemblies] = useState([]);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  async function handleShowAssembliesClick() {
    if (assembliesHidden == false) {
      setAssembliesHidden(!assembliesHidden);
      setAssemblies(null);
    }
    else {
      setAssemblies(await getAssembliesByUserId(handleErrorMessageChange));
      await setTimeout(() => {}, 1000);
      
      if (assemblies) {
        setAssembliesHidden(!assembliesHidden);
      }
      else {
        await clearErrorMessage();
        await handleErrorMessageChange("У вас нет ни одной сборки");
      }
    }
  }

  async function handleOpenAssemblies() {
    if (openAssemblies) {
      setAssembliesHidden(true);
      await handleShowAssembliesClick();
    }
  }

  useEffect(() => {
    handleOpenAssemblies();
  }, []);

  useEffect(() => {
      if (!isSessionUser()) {
        localStorage.setItem('errorMessage', '(401) Вы не вошли в аккаунт');
        navigate('/home');
      }
    }, []);

    
  if (!isSessionUser()) {
    navigate('/home', { replace: true });  
  }
  else {
    const user = getUserFromCookie();      

    return (
      <>
        <ThemeProvider theme={theme}>
          <Header />

          {!error.hidden ? (
            <ErrorSnackbar
              sx={{ margin: '0 auto', mt: 15 }}
              hidden={error.hidden}
              message={error.message}
            />
          ) : null}

          <Container
            maxWidth="sm"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 4,
            }}
          >

            <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 3 }}>
              {t("Options.Account")}
            </Typography>

            <Typography variant="body1" paragraph>
              {t("WelcomeToAccount.1")}: {user.userName}
            </Typography>

            <Paper elevation={5} sx={{ m: 3, p: 3 }}>

              <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  
                  <Grid item xs={12}>
                    <Item elevation={0}>
                      <IconButton size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 100, height: 100 }}>{user.userName.match(/\b(\w)/g)[0].toUpperCase()}</Avatar>
                      </IconButton>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <Typography variant="h6" component="h1" sx={{ marginBottom: 2 }}>
                        Имя и фамилия:
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <TextField disabled id="outlined-disabled" defaultValue={user.fullName}/>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <Typography variant="h6" component="h1" sx={{ marginBottom: 2 }}>
                        Имя пользователя:
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <TextField disabled id="outlined-disabled" defaultValue={user.userName}/>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <Typography variant="h6" component="h1" sx={{ marginBottom: 2 }}>
                        Роли:
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <TextField disabled id="outlined-disabled" defaultValue={user.roles}/>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <Typography variant="h6" component="h1" sx={{ marginBottom: 2 }}>
                        Токен доступа:
                      </Typography>
                    </Item>
                  </Grid>

                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <TextField disabled id="outlined-disabled" defaultValue={user.accessToken}/>
                    </Item>
                  </Grid>


                  <Grid item xs={12}>
                    <Item elevation={0}>
                      <FormControl fullWidth>
                        <InputLabel id="region-label">Выбор валюты</InputLabel>
                        <Select labelId="region-label" id="region-select">
                          <MenuItem value="region1">BYN р.</MenuItem>
                          <MenuItem value="region2">RUB р.</MenuItem>
                          <MenuItem value="region3">USD $</MenuItem>
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>

                </Grid>
              </Box>

            </Paper>

            <Stack direction='row' spacing={2}>
              <LogoutButton />
              <Button onClick={handleShowAssembliesClick} variant='contained' color='primary'>Просмотр моих ПК сборок</Button>
            </Stack>

          </Container>

          {!assembliesHidden && assemblies ? (
            <Container
              maxWidth="lg"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <MyAssemblies errorHandler={handleErrorMessageChange} assemblies={assemblies}/>
            </Container>
            ) : (
            null
          )}

          <Footer />

        </ThemeProvider>
      </>
    );
  }
};


export default ProfilePage;
