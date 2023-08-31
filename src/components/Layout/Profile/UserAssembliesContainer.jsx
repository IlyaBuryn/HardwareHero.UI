import React, { useEffect, useState } from "react";
import { Alert, Container, Grid } from "@mui/material";
import MyAssemblies from "../Assemblies/MyAssemblies";
import { useAssemblyManager } from '../../../services/assemblyManager';


const UserAssembliesContainer = ({ isListOpen }) => {

  const [assemblies, setAssemblies] = useState([]);
  const assemblyManager = useAssemblyManager();

  const errorHandler = (str) => {
    console.log(str);
  }

  async function getAssemblies() {
    if (isListOpen) {
      try {
        var items = await assemblyManager.getAssembliesByUserId()
        setAssemblies(items);
      }
      catch (ex) {
        console.log(ex)
        setAssemblies(null)
      }
    }
  }

  useEffect(() => {
    getAssemblies();
  }, []);

  return (
    isListOpen && assemblies && assemblies.length !== 0 ? (
      <Container maxWidth="lg" sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4 }}
      >
        <MyAssemblies assemblies={assemblies}/>
      </Container>
      ) : isListOpen ? (
      <Grid container justifyContent="center" marginTop={4}>
        <Grid item>
          <Alert sx={{ borderRadius: '10px', width: '300px',
            fontSize: 18, border: '1px solid',
            borderColor: 'red', padding: '8px' }} severity="error">
            У вас нет ни одной сборки!
          </Alert>
        </Grid>
      </Grid>
    ) : null
  )
}

export default UserAssembliesContainer;