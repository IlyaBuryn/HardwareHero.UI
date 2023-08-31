import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableContainer,
  Paper,
  CircularProgress,
  Box, Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Stack,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useConfiguratorManager } from '../../../services/configuratorManager';
import { ErrorSnackbar, useErrorMessage } from '../../Common/Snackbar/ErrorSnackbar';
import { SuccessSnackbar, useSuccessMessage } from '../../Common/Snackbar/SuccessSnackbar';

import { useTranslation } from 'react-i18next';
import ConfiguratorRow from '../../Common/Table/ConfiguratorRow';
import { useAssemblyManager } from '../../../services/assemblyManager';
import { useUserManager } from '../../../services/userManager';
import CanvasGraph from '../../Common/Graph/CanvasGraph';

const baseImageUrl = 'http://localhost/images/';

const getSpecificationValues = (specifications, property) => {
  const values = [];
  specifications.forEach((specification) => {
    if (specification[property] !== null && specification[property].length > 0) {
      values.push(...specification[property]);
    }
  });
  return values;
};

const superData = [
  {
    id: 1,
    image: "https://ram.by/images/logo.png",
    name: "Ram.by",
    quantity: 149.99,
    prices: [ 149.99, 200, 159.99, 149.99,]
  },
  {
    id: 2,
    image: "https://imgproxy.onliner.by/2zEP45MryJX_vTY39kUaP0bn69iivuOYU2GTlfbEX48/w:152/h:56/dpr:2/f:webp/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvYjJiLzI2MTEv/bG9nb3R5cGUvNDkw/NDg5ZTY5M2JmMDUw/MWQ3Y2ZhZWJmMDI1/YTlmZmMuanBlZw",
    name: "KST",
    quantity: 130.59,
    prices: [ 120.59, 130.59, 120.59, 130.59,]
  }
];

const getManufacturerValues = (specifications, property) => {
  const values = [];
  specifications.forEach((specification) => {
    values.push([{ value: specification.manufacturer ? specification.manufacturer : specification.cpuManufacturer,
      series: specification.series }]);
  });
  console.log(values);
  return values;
};

const findSpecificationByProperty = (specifications, property) => {
  return specifications.find(
    (specification) =>
      specification[property] !== null && specification[property].length > 0
  );
};

const ConfiguratorMain = ({ readyComponents }) => {
  const [openSpecificationDialog, setOpenSpecificationDialog] = useState(false);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [assembly, setAssembly] = useState([]);

  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();
  const [alert, handleSuccessMessageChange, clearSuccessMessage] = useSuccessMessage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userManager = useUserManager();
  const configuratorManager = useConfiguratorManager();
  const assemblyManager = useAssemblyManager();

  useEffect(() => {
    const fetchData = async () => {
      clearErrorMessage();
      handleLoadingChange(true);
      const responseMessage = await configuratorManager.getComponentTypes()
      trySetData(responseMessage.responseValue);
      handleLoadingChange(false);
    };

    fetchData();
  }, []);

  const handleCloseDialog = () => {
    setOpenSpecificationDialog(false);
  };

  const trySetData = (items) => {
    setData(items);
  };

  const handleLoadingChange = (hide) => {
    setLoading(hide);
  };

  const openDialogWithSeriesValues = (seriesValues) => {
    setSelectedSpecifications([{ series: seriesValues }]);
    setSelectedProperty('series');
    setOpenSpecificationDialog(true);
  };

  const transformData = (item) => {
    const { id, images, specifications, ...rest } = item.item;
    return { ...rest, index: item.index };
  };

  async function handleDownloadJsonButtonClick() {
    clearErrorMessage()
    const responseMessage = assemblyManager.saveJsonAsembly(assembly.map(transformData))
    await clearSuccessMessage();
    await handleSuccessMessageChange(responseMessage.message)
  }

  async function handleSaveButtonClick() {
    clearErrorMessage();

    if (assembly.length != data.length) {
      const confirmed = window.confirm("У вас не собрана полная конфигурация! Хотите продолжить выполнение?");

      if (confirmed) {
        await clearSuccessMessage();
        await assemblyManager.saveAsseblyToDatabase(assembly);

      }
      else {
        await clearErrorMessage();
        await handleErrorMessageChange('Вы отказались сохранять конфигурацию!')
      }
    }
    else {
      await assemblyManager.saveAsseblyToDatabase(assembly);
    }
  }


  async function handleChoiseButtonClick() {
    try {
      const responseMessage = await assemblyManager.getAssembliesByUserId(
        userManager.getUserSessionInfo().responseValue.userId);
      if (!responseMessage.responseValue || responseMessage.responseValue.length === 0) {
        await clearErrorMessage();
        await handleErrorMessageChange('У вас нет ни одной сборки!');
      }
      else {
        navigate('/account', { state: { openAssemblies: true } });
      }
    }
    catch (ex) {
      await clearErrorMessage();
      await handleErrorMessageChange('У вас нет ни одной сборки!');
    }
  }

  const AssemblyHandler = (item, index, componentImage) => {
    setAssembly(assembly => {
      if (!item) {
        return assembly.filter(i => i.index !== index);
      } else {
        return [...assembly, { item, index, componentImage }];
      }
    });
  };
  

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 100 }}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <>
    {!alert.hidden ? (
      <SuccessSnackbar
        sx={{ margin: '0 auto', mt: 15 }}
        hidden={alert.hidden}
        message={alert.message}
      />
    ) : null}
    {!error.hidden ? (
      <ErrorSnackbar
        sx={{ margin: '0 auto', mt: 15 }}
        hidden={error.hidden}
        message={error.message}
      />
    ) : null}
    <Grid container spacing={3} justifyContent="center">
      {assembly && assembly.length > 0 && (
        <Grid item xs={3}>
          <TableContainer component={Paper} elevation={5} sx={{ margin: '0 auto', mt: 15 }}>
            <Table>
              <TableBody>

                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                      <Box sx={{ fontWeight: 'bold' }}>{t("PCValue.general")}</Box>
                    </Box>
                  </TableCell>
                </TableRow>

                {assembly.map((item, index) => (
                  <>
                    <TableRow>

                      <TableCell colSpan={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                          <Avatar
                            alt={item.componentImage}
                            src={baseImageUrl + item.componentImage}
                            variant="rounded"
                            sx={{ width: 48, height: 48 }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell colSpan={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                          <Box sx={{ mt: 1.5 }}>{item.item.name }</Box>
                          <Box sx={{ mt: 1.5 }}>{item.index}</Box>
                        </Box>
                      </TableCell>

                      <TableCell colSpan={1}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                          <Button variant='outlined'>Цены</Button>
                          <Button sx={{mt: 2}} variant='contained'>Перейти</Button>
                        </Box>
                      </TableCell>

                    </TableRow>

                    {/* <TableRow>
                      {superData.map((item) => (
                        <TableCell colSpan={1}>
                           <div style={{ overflowX: 'auto', width: 150 }}>
                            <Stack sx={{ m: 2 }} direction="row" alignItems="center">
                              <Box width="150px">
                                <Stack direction="column" sx={{ width: '150px' }} alignItems="center">
                                  <Avatar
                                    alt={`Image ${item.id}`}
                                    src={item.image}
                                    variant="rounded"
                                    sx={{ width: 48, height: 48, m: 2 }}
                                  />
                                  <Typography variant="h6" color="text.secondary">
                                    {item.name}
                                  </Typography>
                                  <Typography variant="body2" component="div">
                                    Цена в магазине: {item.quantity}
                                  </Typography>
                                  <CanvasGraph prices={item.prices} />
                                </Stack>
                              </Box>
                            </Stack>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow> */}
                  </>
                ))}

                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                      <Box sx={{ mt: 1.5, fontWeight: 'bold' }}>{t("PCValue.general")}; {t("PCValue.price")}: ~{assembly.reduce(function(sum, value) {
                              return sum + value.item.initialPrice;
                        }, 0).toFixed(2) }</Box>
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={3}>

                    { userManager.isLoggedIn() ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black', mb: 2 }}>
                        <Stack direction="row" spacing={2}>
                          <Button onClick={handleSaveButtonClick} sx={{ fontWeight: 'bold' }} variant='contained' color='secondary'>Сохранить</Button>
                          <Button onClick={handleChoiseButtonClick} sx={{ fontWeight: 'bold' }} variant='contained' color='primary'>Загрузить</Button>
                        </Stack>
                      </Box>
                    ) : null}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                      <Stack direction="row" spacing={2}>
                        <Button sx={{ fontWeight: 'bold', borderWidth: 2, borderStyle: 'solid', borderColor: 'black' }} 
                          onClick={handleDownloadJsonButtonClick} variant='outlined' color='primary'>Скачать JSON</Button>
                      </Stack>
                    </Box>
                    
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
        <Grid item xs={8}>
          <TableContainer component={Paper} elevation={5} sx={{ margin: '0 auto', mt: 15 }}>
            <Table>
              <TableBody>
                {data.map((item, index) => (
                  <ConfiguratorRow
                    item={item}
                    index={index}
                    assemblyHandler={AssemblyHandler}
                    errorHandler={handleErrorMessageChange}
                    readyComponents={readyComponents}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openSpecificationDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedProperty}</DialogTitle>
        <DialogContent>
          <List>
            {selectedSpecifications.map((specification, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${specification[selectedProperty].join(', ')}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default ConfiguratorMain;