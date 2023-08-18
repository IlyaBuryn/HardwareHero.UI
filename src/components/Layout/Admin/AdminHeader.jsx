import { Button, Stack, Typography } from "@mui/material";


export default function AdminHeader() {

  return (
    <>
      <Stack spacing={3} direction='row' alignContent='center' justifyContent='center'>

        <Typography variant='body2'>Admin functions:</Typography>

        <Button variant='outlined'>Menu</Button>

        <Button variant='outlined'>Chats</Button>

        <Button variant='outlined'>App Info</Button>

      </Stack>
    </>
  );
}