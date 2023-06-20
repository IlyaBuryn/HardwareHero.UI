import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Divider } from '@mui/material';

export const UserInfoDialog = ({ open, onClose, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Information</DialogTitle>
      <DialogContent>
        <Typography>Email: {user.email}</Typography>
        <Typography>Name: {user.name}</Typography>
        <Typography>Last Name: {user.lastName}</Typography>
        <Typography>Registration Date: {user.registrationDate}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export const ContributorInfoDialog = ({ open, onClose, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User Information</DialogTitle>
      <DialogContent sx={{ m: 3 }}>
        <Typography>Email: {user.Email}</Typography>
        <Typography>UserName: {user.UserName}</Typography>
        <Typography>Name: {user.Name}</Typography>
        <Typography>Roles: {user.Roles}</Typography>
        <Typography>Registration Date: {user.RegistrationDate}</Typography>
        <Divider />
        <Typography>Contributor Request Date: {user.TimeStamp}</Typography>
      </DialogContent>
    </Dialog>
  );
};
