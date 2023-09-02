import React from 'react';
import { Avatar, Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useUserManager } from '../../../services/userManager';
import LogoutButton from '../../Common/Buttons/LogoutButton/LogoutButton';
import InfoDisplay from '../../Common/Text/InfoDisplay';
import StyledContentBox from '../../Common/Paper/StyledContentBox';
import UserAvatarContainer from '../../Common/Avatar/UserAvatarContainer';


const UserInfoContainer = ({ onToggleList }) => {

  const { t } = useTranslation();
  const userManager = useUserManager();
  const user = userManager.getUserSessionInfo().responseValue;

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
            
            <UserAvatarContainer xs={12} size={100} avatar={user.userName.match(/\b(\w)/g)[0].toUpperCase()} />
            <InfoDisplay text={'Имя и фамилия'} value={user.fullName} xs={6} />
            <InfoDisplay text={'Имя пользователя'} value={user.userName} xs={6} />
            <InfoDisplay text={'Роли'} value={user.roles} xs={6} />
            <InfoDisplay text={'Токен доступа'} value={user.accessToken} xs={6} />


            <Grid item xs={12}>
              <StyledContentBox elevation={0}>
                <FormControl fullWidth>
                  <InputLabel id="region-label">Выбор валюты</InputLabel>
                  <Select labelId="region-label" id="region-select">
                    <MenuItem value="region1">BYN р.</MenuItem>
                    <MenuItem value="region2">RUB р.</MenuItem>
                    <MenuItem value="region3">USD $</MenuItem>
                  </Select>
                </FormControl>
              </StyledContentBox>
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