import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';


import { getComponentTypes } from './../../../services/configuratorManager';
import {
  ErrorSnackbar,
  useErrorMessage,
} from '../../Common/Snackbar/ErrorSnackbar';

import { useTranslation } from 'react-i18next';
import ConfiguratorRow from '../../Common/Table/ConfiguratorRow';

const baseUrl = 'http://localhost';

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

const ConfiguratorMain = () => {
  const [openSpecificationDialog, setOpenSpecificationDialog] = useState(false);
  const [selectedSpecifications, setSelectedSpecifications] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');

  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();
  const { t, i18n } = useTranslation();

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

  if (isLoading) {
    return (
      <Box sx={{ margin: '0 auto', mt: 15 }}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  if (!error.hidden) {
    return (
      <ErrorSnackbar
        sx={{ margin: '0 auto', mt: 15 }}
        hidden={error.hidden}
        message={error.message}
      />
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '60%', margin: '0 auto', mt: 15 }}>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <ConfiguratorRow item={item} index={index} />
            ))} 
          </TableBody>

        </Table>
      </TableContainer>

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