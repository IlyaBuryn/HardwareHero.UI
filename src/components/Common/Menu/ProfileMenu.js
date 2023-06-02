import * as React from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip, Stack } from '@mui/material'

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useErrorMessage, ErrorSnackbar } from '../Snackbar/ErrorSnackbar';
import { logout } from '../../../services/userManager';

export default function AccountMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  

  const handleLogoutClick = () => {
    logout(handleErrorMessageChange)
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user.userName) {
    return null
  };

  return (
    <React.Fragment>
      <ErrorSnackbar message={error.message} hidden={error.hidden}/>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user.userName.match(/\b(\w)/g)[0].toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/account'>
            <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexDirection: 'row' }}>
                <Avatar />
                <Typography sx={{ marginLeft: '0.5rem' }}>{t("MyAccount.1")}</Typography>
            </Stack>
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout.1')}
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
}