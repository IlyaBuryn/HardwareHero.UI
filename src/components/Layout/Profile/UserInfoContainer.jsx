import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useUserManager } from '../../../services/userManager';
import LogoutButton from '../../Common/Buttons/LogoutButton/LogoutButton';


const UserInfoContainer = ({ onToggleList }) => {

  const { t } = useTranslation();
  const userManager = useUserManager();
  const user = userManager.getUserSessionInfo().responseValue;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container maxWidth="sm" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4 }}
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
        <Button onClick={onToggleList} variant='contained' color='primary'>Просмотр моих ПК сборок</Button>
      </Stack>

    </Container>
  )
}


export default UserInfoContainer;