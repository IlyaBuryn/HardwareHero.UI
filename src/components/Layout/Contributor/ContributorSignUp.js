import React, { useEffect, useState } from 'react';
import { Paper, TextField, Box, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';
import { createContributor, getContributorByUserId } from '../../../services/contributorManager';
import { ErrorAlert, useErrorMessage } from '../../Common/Alert/ErrorAlert';
import SuccessBox from '../Configurator/SuccessBox';
import DeniedBox from '../Configurator/DeniedBox';
import { getUserFromCookie, isSessionUser } from '../../../services/userManager';

const regions = ['Беларусь', 'Россия', '(EU)', '(СНГ)'];
const baseImageUrl = 'http://localhost/images/';

const ContributorSignUp = () => {
  const [companyName, setCompoanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [region, setRegion] = useState('');
  const [logoUrl, setLogoUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isUserAlreadyStartContributor, setIsUserAlreadyStartContributor] = useState(false);
  const [isUserContributorDenied, setIsUserContributorDenied] = useState(false)
  const [contributorId, setContributorId] = useState('');
  const [paperHeight, setPaperHeight] = useState(0);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);

  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();  

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setLogoUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCompanyName = (event) => {
    setCompoanyName(event.target.value)
  }

  const handleCompanyUrl = (event) => {
    setCompanyUrl(event.target.value)
  }

  const submitChanges = async () => {
    if (!companyName || !companyUrl || !region || !logoUrl) {
      handleErrorMessageChange('Некоторые поля не заполнены!')
    }
    else {
      const file = selectedImage
      const fileExtension = file.name.split('.').pop();
      const fileName = `${companyName}_logo.${fileExtension}`;

      const response = await createContributor(handleErrorMessageChange, region, companyName, companyUrl, fileName, selectedImage)
      if (response) {
        window.location.reload();
      }
    }
  }


  const placeholderHandler = (str) => { }


  useState(async () => {
    setIsLoadingScreen(true);
    if (isSessionUser()) {
      const contributorRequest = await getContributorByUserId(placeholderHandler, getUserFromCookie().userId)
      // if (contributorRequest) {
      //   setContributorId(contributorRequest.id);
      // }

      if (contributorRequest === null) {
        setIsUserAlreadyStartContributor(false);
        setIsUserContributorDenied(false);
      }
      else if (contributorRequest.isConfirmed === null) {
        setIsUserAlreadyStartContributor(true);
        setIsUserContributorDenied(false);
      }
      else if (contributorRequest.isConfirmed === false) {
        setIsUserAlreadyStartContributor(false);
        setIsUserContributorDenied(true);
        setContributorId(contributorRequest.id);
      }
      else {
        setIsUserAlreadyStartContributor(false);
        setIsUserContributorDenied(false);
      }
    }
    setIsLoadingScreen(false);
  }, [])


  if (isLoadingScreen) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 100 }}>
        <CircularProgress size={100} />
      </Box>
    );
  }


  if (isUserAlreadyStartContributor === true) {
    return (
      <SuccessBox />
    )
  }
  else if (isUserContributorDenied === true) {
    return (
      <DeniedBox contrId={contributorId} />
    )
  }
  else {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1 1 40%', marginRight: '16px' }}>
          <Paper
            elevation={5}
            sx={{ p: 8, m: 8, ml: 20 }}
            ref={(el) => {
              if (el) {
                setPaperHeight(el.clientHeight);
              }
            }}
          >
            <form>
              <ErrorAlert hidden={error.hidden} message={error.message}/>
              {error.hidden ? ( null ) : ( <><br /></>)}

              <TextField onChange={handleCompanyName} label="Название сайта/компании" variant="outlined" fullWidth />
              <br />
              <br />

              <TextField onChange={handleCompanyUrl} label="Ссылка на сайт" variant="outlined" fullWidth />
              <br />
              <br />

              <FormControl fullWidth>
                <InputLabel id="region-label">Регион</InputLabel>
                <Select
                  labelId="region-label"
                  id="region-select"
                  value={region}
                  label="Регион"
                  onChange={handleRegionChange}
                >
                  {regions.map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br />
              <br />

              <label htmlFor="logo-upload">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Логотип"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '200px',
                      border: '2px dashed #aaa',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Загрузить логотип
                  </div>
                )}
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="logo-upload"
                  type="file"
                  onChange={handleLogoChange}
                />
              </label>
              <br />
              <br />

              <Button onClick={() => submitChanges()} variant="contained" fullWidth>
                Подтвердить
              </Button>
              
            </form>
          </Paper>
        </div>

        <div style={{ flex: '2 1 80%' }}>
          <img
            src={baseImageUrl + "contributorSignUpHomeImage.png"}
            alt="Contributor Sign Up Home Image"
            style={{ maxHeight: 650 }}
          />
        </div>

      </div>
    );
  }
};

export default ContributorSignUp;
