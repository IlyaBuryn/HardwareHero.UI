import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useUserManager } from '../../../../services/userManager';
import ProfileMenu from '../../../Common/Menu/ProfileMenu';
import AuthDialogButtons from '../../DialogButtons/AuthDialogButtons';
import './../Header.css';


function RightHeaderControls() {

  const [userFullName, setUserFullName] = useState('');
  const [userRole, setUserRole] = useState('')
  const { t } = useTranslation();
  const userManager = useUserManager();

  useEffect(() => {
    if (userManager.isLoggedIn()) {
      setUserFullName(userManager.getUserSessionInfo().fullName);
      setUserRole(userManager.getUserRole())
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
          <ProfileMenu user={userManager.getUserSessionInfo()} />
        </>
      ) : <AuthDialogButtons />}
    </Stack>
  )
}


export default RightHeaderControls;