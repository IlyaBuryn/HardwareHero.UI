import React from 'react';
import { Box, Button, IconButton, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';


const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'blue', // Установите нужный вам цвет фона здесь
  '&:hover': {
    backgroundColor: 'red' // Установите нужный вам цвет фона при наведении здесь
  },
  border: '1px solid',
  borderColor: theme.palette.secondary.main,
}));

const MainCircleRowLinks = () => {
  return (
    <Box>

      <CustomIconButton color='secondary'>
        <PersonIcon sx={{ fontSize: 140 }}/>
      </CustomIconButton> 

      <CustomIconButton color='secondary'>
        <PersonIcon sx={{ fontSize: 140 }}/>
      </CustomIconButton>

      <CustomIconButton color='secondary'>
        <PersonIcon sx={{ fontSize: 140 }}/>
      </CustomIconButton>

    </Box>
  );
};

export default MainCircleRowLinks;
