import { createTheme } from '@mui/material/styles';

import { themeColors } from './colors';


export const standardTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.primaryMain.color,
    },
    secondary: {
      main: themeColors.secondaryMain.color,
      light: themeColors.secondaryLight.color,
    },   
  }
});


export const lightLinks = createTheme({
  palette: {
    primary: {
      main: themeColors.secondaryMain.color,
    }
  }
});