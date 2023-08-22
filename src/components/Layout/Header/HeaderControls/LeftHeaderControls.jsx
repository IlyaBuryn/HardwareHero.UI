import React, { useEffect, useState } from 'react'
import { Badge, Fab, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WidgetsIcon from '@mui/icons-material/Widgets';

import LanguageMenu from '../../../Common/Menu/LanguageMenu';
import { getUserRole, isSessionUser } from '../../../../services/userManager';


function LeftHeaderControls() {

  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    if (isSessionUser()) {
      setUserRole(getUserRole());
    }
  }, []);

  return (
    <>
      <LanguageMenu />

      <Badge badgeContent={0} sx={{ ml: 1 }} color="secondary" showZero max={99}>
        <FavoriteIcon color="white" />
      </Badge>
      
      {userRole === 'Admin' || userRole === 'Manager' ? (
        <Fab size="small" sx={{ ml: 2.5 }} variant="extended">
          <WidgetsIcon sx={{ mr: 1 }} />
          {userRole}
        </Fab>
      ) : null}

      <Typography variant='h6' sx={{ flexGrow: 1 }}></Typography>

    </>
  )
}

export default LeftHeaderControls;