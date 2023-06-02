import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
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

import { getComponentTypes } from './../../../services/configuratorManager';
import { ErrorSnackbar, useErrorMessage } from '../../Common/Snackbar/ErrorSnackbar';
import { SuccessSnackbar, useSuccessMessage } from '../../Common/Snackbar/SuccessSnackbar';

import { useTranslation } from 'react-i18next';
import ConfiguratorRow from '../../Common/Table/ConfiguratorRow';
import { getAssembliesByUserId, saveAsseblyToDatabase, saveJsonAsembly } from '../../../services/assemblyManager';
import { getUserFromCookie, isSessionUser } from '../../../services/userManager';

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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearErrorMessage();
        handleLoadingChange(true);
        trySetData(await getComponentTypes(handleErrorMessageChange, handleLoadingChange));
        handleLoadingChange(false);
      } catch (error) {
        handleErrorMessageChange(error.message);
        handleLoadingChange(false);
      }
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
    saveJsonAsembly(handleErrorMessageChange, assembly.map(transformData))
    await clearSuccessMessage();
    await handleSuccessMessageChange('Файл отправлен!')
  }

  async function handleSaveButtonClick() {
    clearErrorMessage();

    if (assembly.length != data.length) {
      const confirmed = window.confirm("У вас не собрана полная конфигурация! Хотите продолжить выполнение?");

      if (confirmed) {
        await clearSuccessMessage();
        await saveAsseblyToDatabase(handleErrorMessageChange, handleSuccessMessageChange, assembly);

      }
      else {
        await clearErrorMessage();
        await handleErrorMessageChange('Вы отказались сохранять конфигурацию!')
      }
    }
    else {
      await saveAsseblyToDatabase(handleErrorMessageChange, handleSuccessMessageChange, assembly);
    }
  }


  async function handleChoiseButtonClick() {
    try {
      const assembliesCount = await getAssembliesByUserId(handleErrorMessageChange, getUserFromCookie().userId).length;
      if (assembliesCount == 0) {
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
                  <TableCell colSpan={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                      <Box sx={{ fontWeight: 'bold' }}>{t("PCValue.general")}</Box>
                    </Box>
                  </TableCell>
                </TableRow>

                {assembly.map((item, index) => (
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                        <Avatar
                          alt={item.componentImage}
                          src={baseImageUrl + item.componentImage}
                          variant="rounded"
                          sx={{ width: 48, height: 48 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                        <Box sx={{ mt: 1.5 }}>{item.item.name }</Box>
                        <Box sx={{ mt: 1.5 }}>{item.index}</Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'black' }}>
                      <Box sx={{ mt: 1.5, fontWeight: 'bold' }}>{t("PCValue.general")}; {t("PCValue.price")}: ~{assembly.reduce(function(sum, value) {
                              return sum + value.item.initialPrice;
                        }, 0).toFixed(2) }</Box>
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>

                    { isSessionUser() ? (
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