import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';

const options = [
  { label: 'Русский', prefix: 'ru' },
  { label: 'English', prefix: 'en' }
];

const ITEM_HEIGHT = 48;

export default function LanguageMenu() {

  const { i18n } = useTranslation();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState('');

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.prefix);
    handleClose();
    i18n.changeLanguage(language.prefix);
  };

  return (
    <div>
      <Tooltip title="Language" >
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <LanguageIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} selected={option === selectedLanguage} onClick={() => handleLanguageSelect(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}