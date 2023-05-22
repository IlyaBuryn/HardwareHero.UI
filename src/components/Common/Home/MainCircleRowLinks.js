import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, styled, Stack, Divider, Paper } from '@mui/material';
import { themeColors } from './../../../utils/colors.js';
import './MainCircleRowLinks.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

import { useTranslation } from 'react-i18next';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: themeColors.darkerThanBackColor.color,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  width: '200px',
  height: '200px',
  '&:hover': {
    backgroundColor: themeColors.darkerThanComponentColor.color,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)'
  }
}));

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  width: 250,
  margin: 20
}));

const getTest = async () => {
  var response = await fetch(
    'gateway/contributor',
    {
      method: 'get'
    }
  )

  var responsejson = await response.json();
  console.log(responsejson);
}

const MainCircleRowLinks = () => {

  const { t, i18n } = useTranslation();

  return (
    <>
      <Box>
        <Stack spacing={25} direction='row' justifyContent="center" alignItems="center">

          <Item elevation={0}>
            <CustomIconButton onClick={getTest} size="large">
              <LocalOfferIcon sx={{ fontSize: 100, color: 'white' }}/>
            </CustomIconButton> 
            <h2>{t('Options.Prices')}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Item>

          <Item elevation={0}>
            <CustomIconButton size="large">
              <HomeRepairServiceIcon sx={{ fontSize: 100, color: 'white' }}/>
            </CustomIconButton>
            <h2>{t('Options.Services')}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Item>

          <Item elevation={0}>
            <Link to="/configurator">
              <CustomIconButton size="large">
                <SettingsInputComponentIcon sx={{ fontSize: 100, color: 'white' }}/>
              </CustomIconButton>
            </Link>
            <h2>{t('Options.Configurator')}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Item>
          
        </Stack>
      </Box>

      <Divider variant="middle" sx={{ m: 5, ml: 10, mr: 10 }}></Divider>

      <Box>
        <Stack spacing={25} direction='row' justifyContent="center" alignItems="center">
          
          <Item elevation={0}>
            <CustomIconButton size="large">
              <AccountCircleIcon sx={{ fontSize: 100, color: 'white' }}/>
            </CustomIconButton> 
            <h2>{t('Options.Account')}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Item>

          <Item elevation={0}>
            <CustomIconButton size="large">
              <HandshakeIcon sx={{ fontSize: 100, color: 'white' }}/>
            </CustomIconButton>
            <h2>{t('Options.Contributors')}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </Item>

        </Stack>
      </Box>
    </>
  );
};

export default MainCircleRowLinks;
