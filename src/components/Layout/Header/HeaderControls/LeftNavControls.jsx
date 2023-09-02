import React, { useEffect, useState } from 'react'
import { Badge, Fab, Tooltip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PublicIcon from '@mui/icons-material/Public';

import LanguageMenu from '../../../Common/Menu/LanguageMenu';
import { useUserManager } from '../../../../services/userManager';


function LeftNavControls() {

  const [userRole, setUserRole] = useState('')
  const userManager = useUserManager();

  useEffect(() => {
    if (userManager.isLoggedIn()) {
      setUserRole(userManager.getUserRole());
    }
  }, []);

  return (
    <>
      <LanguageMenu />
      {/* TODO: */}
      {/* <WishListMenu /> */}
      {/* <CurrencyMenu /> */}
      {/* <RegionMenu /> */}
      {/* <EmployeeMenu /> */}

      <Tooltip title="Wishlist" >
        <Badge badgeContent={0} sx={{ ml: 1 }} color="secondary" max={99}>
          <FavoriteIcon color="white" />
        </Badge>
      </Tooltip>

      <Tooltip title="Region and currency" >
        <Fab size="small" color="secondary" sx={{ ml: 2.5 }} variant="extended">
          <PublicIcon sx={{ mr: 1 }} />
          Region / CUR
        </Fab>
      </Tooltip>
    
      {userRole === 'Admin' || userRole === 'Manager' ? (
        <Fab size="small" sx={{ ml: 2 }} variant="extended">
          <WidgetsIcon sx={{ mr: 1 }} />
          {userRole}
        </Fab>
      ) : null}

      <Typography variant='h6' sx={{ flexGrow: 1 }}></Typography>

    </>
  )
}

export default LeftNavControls;