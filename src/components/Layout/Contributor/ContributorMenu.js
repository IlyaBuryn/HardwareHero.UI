import { Container, Box, Stack, Typography, Button, Paper, Grid } from "@mui/material";
import React from "react";


export default function ContributorMenu() {
  return (
    <>
      <Container fixed>
        <Grid container spacing={3}>

          <Grid item xs={4}>
            <Box sx={{ mt: 10, ml: 5 }}>
              <Stack direction='column' spacing={2}>
                <Typography textAlign='center'>Меню партнеров:</Typography>
                <Button variant='contained'>Chats</Button>
                <Button variant='contained'>Sub. Plans</Button>
                <Button variant='contained'></Button>
                <Button variant='contained'></Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={2}></Grid>

          <Grid item xs={6}>
            <Box sx={{ mt: 10, ml: 5 }} justifyContent='center' alignContent='center'>
              <Paper elevation={5}>
                
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}