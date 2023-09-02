import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

import StyledContentBox from './../Paper/StyledContentBox';

const InfoDisplay = ({ text, value, xs }) => {

  return (
    <>
      <Grid item xs={xs}>
        <StyledContentBox elevation={0}>
          <Typography variant="h6" component="h1" sx={{ marginBottom: 2 }}>
            {text}:
          </Typography>
        </StyledContentBox>
      </Grid>

      <Grid item xs={xs}>
        <StyledContentBox elevation={0}>
          <TextField disabled id="outlined-disabled" defaultValue={value}/>
        </StyledContentBox>
      </Grid>
    </>
  );
}

export default InfoDisplay;