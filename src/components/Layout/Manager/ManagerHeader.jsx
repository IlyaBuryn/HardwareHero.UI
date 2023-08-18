import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function ManagerHeader() {

  return (
    <>
      <Stack spacing={3} direction='row' alignContent='center' justifyContent='center'>

        <Typography variant='body2'>Manager functions:</Typography>

        <Link to='/manager'>
          <Button sx={{ fontWeight: 19}} variant='outlined'>Menu</Button>
        </Link>

        <Link to='/manager/chats'>
          <Button sx={{ fontWeight: 19}} variant='outlined'>Chats</Button>
        </Link>

        <Link to='/contributor-requests'>
          <Button sx={{ fontWeight: 19}} variant='outlined'>Contributor requests</Button>
        </Link>

      </Stack>
    </>
  );
}