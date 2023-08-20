import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getUserFromCookie, getUserRole, isSessionUser } from '../../../services/userManager';
import ProfileMenu from '../../Common/Menu/ProfileMenu';
import AuthDialogButtons from '../DialogButtons/AuthDialogButtons';
import './Header.css';


function RightHeaderControls() {

  const [userFullName, setUserFullName] = useState('');
  const [userRole, setUserRole] = useState('')
  const { t } = useTranslation();

  useEffect(() => {
    if (isSessionUser()) {
      setUserFullName(getUserFromCookie().fullName);
      setUserRole(getUserRole())
    }
  }, []);

  return (
    <Stack spacing={2} direction='row' sx={{ marginRight: 'auto' }}>

      {userFullName && userRole ? (
        <>
          <Stack direction="column">
            <Typography className="user-info-text" align='right' variant='body2' flexGrow={1}>
              {t("Name.1")}: {userFullName}
            </Typography>
            <Typography className="user-info-text" align='right' variant='body2' flexGrow={1}>
            {t("Role.1")}: {userRole}
            </Typography>
          </Stack>
          <ProfileMenu user={getUserFromCookie()} />
        </>
      ) : <AuthDialogButtons />}
    </Stack>
  )
}


export default RightHeaderControls;