import { IconButton, Avatar, Grid } from "@mui/material";
import React from "react"
import StyledContentBox from "../Paper/StyledContentBox";

const UserAvatarContainer = ({ size, avatar, xs }) => {

  return (
    <Grid item xs={xs}>
      <StyledContentBox elevation={0}>
        <IconButton size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: `${size}px`, height: `${size}px` }}>{avatar}</Avatar>
        </IconButton>
      </StyledContentBox>
    </Grid>
  );
}

export default UserAvatarContainer;