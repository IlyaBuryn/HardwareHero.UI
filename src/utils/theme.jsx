import { createTheme } from '@mui/material/styles';

import { themeColors } from './colors';


export const standardTheme = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanBackColor.color,
    },
    secondary: {
      main: themeColors.darkerThanComponentColor.color,
      light: themeColors.componentColor.color,
    },   
  }
});


export const lightLinks = createTheme({
  palette: {
    primary: {
      main: themeColors.darkerThanComponentColor.color,
    }
  }
});