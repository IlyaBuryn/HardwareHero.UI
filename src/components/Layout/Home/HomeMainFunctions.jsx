import React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';

import { isSessionUser } from '../../../services/userManager';
import { useSnackbarQueue } from '../../Common/Snackbar/SnackbarQueue';
import CircularIconButton from '../../Common/Buttons/CircularIconButton/CircularIconButton';
import { useAuthDialog } from '../../Common/Dialog/AuthDialogContext';


const HomeMainFunctions = () => {

  const { t } = useTranslation();
  const enqueueSnackbar = useSnackbarQueue();
  const { setIsSignInModalOpen } = useAuthDialog();

  const switchToSignInDialog = () => {
    enqueueSnackbar(t("Warnings.UnauthorizedToContributorPage"), 'warning');
    setIsSignInModalOpen(true);
  }

  return (
    <>
      <Box>
        <Stack spacing={25} direction="row" justifyContent="center" alignItems="center">
          <CircularIconButton 
            to="/prices"
            icon={LocalOfferIcon}
            titleTranslationKey="Options.Prices"
            descriptionTranslationKey="HomeButtonsDescription.prices"
            onClickWithoutLink={() => {}}
          />

          <CircularIconButton
            to={isSessionUser() ? '/account' : null}
            icon={AccountCircleIcon}
            titleTranslationKey="Options.Account"
            descriptionTranslationKey="HomeButtonsDescription.account"
            onClickWithoutLink={() => enqueueSnackbar(t("Errors.Unauthorized"), 'error')}
          />

          <CircularIconButton
            to="/configurator"
            icon={SettingsInputComponentIcon}
            titleTranslationKey="Options.Configurator"
            descriptionTranslationKey="HomeButtonsDescription.configurator"
            onClickWithoutLink={() => {}}
          />
        </Stack>
      </Box>

      <Divider variant="middle" sx={{ m: 5, ml: 10, mr: 10 }}></Divider>

      <Box>
        <Stack spacing={25} direction="row" justifyContent="center" alignItems="center">
          <CircularIconButton
            to="/services"
            icon={HomeRepairServiceIcon}
            titleTranslationKey="Options.Services"
            descriptionTranslationKey="HomeButtonsDescription.services"
            onClickWithoutLink={() => {}}
          />

          <CircularIconButton
            to={isSessionUser() ? '/contributor' : null}
            icon={HandshakeIcon}
            titleTranslationKey="Options.Contributors"
            descriptionTranslationKey="HomeButtonsDescription.contributors"
            onClickWithoutLink={switchToSignInDialog}
          />
        </Stack>
      </Box>
    </>
  );
};

export default HomeMainFunctions;
