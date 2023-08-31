import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, Stack, Avatar, ListItemText, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAggregatorManager } from '../../../services/aggregatorManager';
import { useNavigate } from 'react-router-dom';
import { useSnackbarQueue } from '../../Common/Snackbar/SnackbarQueue';

const baseImageUrl = 'http://localhost/images/';

const MyAssemblies = ({ assemblies }) => {
  const [expanded, setExpanded] = useState(false);
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();
  const enqueueSnackbar = useSnackbarQueue();
  const aggregatorManager = useAggregatorManager();

  const errorHandler = (str) => {
    console.log(str);
  }

  const handleChange = (panel) => (event, isExpanded,) => {
    setExpanded(isExpanded ? panel : false);
  };

  async function handleShowAssembliesClick(ids, exp, ev, panel) {
    setExpanded(exp ? panel : false);
    if (!exp) {
      setComponents(null);
    }
    else {
      try {
        const promises = ids.map(async id => (await aggregatorManager.getComponentById(id)).responseValue);
        const componentsValue = await Promise.all(promises);
        setComponents(componentsValue);
      } catch (error) {
        enqueueSnackbar('Response error!', 'error');
      }
    }
  }


  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {assemblies.map((assembly) => (
        <Accordion elevation={5} sx={{ textAlign: 'center', mt: 3 }} expanded={expanded === assembly.id} key={assembly.id} onChange={(event, expanded) => handleShowAssembliesClick(assembly.componentIds, expanded, event, assembly.id)}>

          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{`Время: ${assembly.creationDate}`}</Typography>
          </AccordionSummary>

          <AccordionDetails>
          <Stack spacing={3} direction='row' alignItems='center' justifyContent='center'> 
              {components ? components.map((item, index) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                      alt={item.images.split(',')[0] ?? "alt"}
                      src={baseImageUrl + item.images.split(',')[0]}
                      variant="rounded"
                      sx={{ width: 96, height: 96, mr: 2 }}
                    />
                  <ListItemText sx={{ width: 150 }} primary={item.name} secondary={item.initialPrice + ' BYN'} />
                </Box>
              )) : null}
            </Stack>       

            <Button onClick={() => {navigate('/configurator', { state: { readyComponents: components } })}} variant="contained" color="primary">
              Просмотр в конфигураторе
            </Button>

            <Button variant='outlined' color="primary">
              Просмотр цен
            </Button>

          </AccordionDetails>

        </Accordion>
      ))}
    </div>
  );
};

export default MyAssemblies;
