import React from 'react'
import { Link } from 'react-router-dom';
import { IconButton, styled, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { themeColors } from '../../../../utils/colors';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: themeColors.primaryMain.color,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  width: '200px',
  height: '200px',
  '&:hover': {
    backgroundColor: themeColors.secondaryMain.color,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)'
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  width: 250,
  margin: 20
}));


const CircularIconButton = ({ to, icon: IconComponent, titleTranslationKey, descriptionTranslationKey, onClickWithoutLink }) => {

  const { t } = useTranslation();

  return (
    <Item elevation={0} sx={{ height: 450 }}>
      {to ? (
        <Link to={to}>
          <CustomIconButton size="large">
            <IconComponent sx={{ fontSize: 100, color: 'white' }} />
          </CustomIconButton>
        </Link>
      ) : (
        <CustomIconButton size="large" onClick={onClickWithoutLink}>
          <IconComponent sx={{ fontSize: 100, color: 'white' }} />
        </CustomIconButton>
      )}
      <h2>{t(titleTranslationKey)}</h2>
      <p>{t(descriptionTranslationKey)}</p>
    </Item>
  );
}

export default CircularIconButton