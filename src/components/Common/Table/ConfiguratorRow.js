import React, { useState, useEffect } from "react";
import { TableRow, TableCell,
  IconButton, Button,
  Menu, MenuItem,
  ListItemText, ListItemAvatar,
  Typography, InputBase,
  Avatar, Box, Pagination, Stack  } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import DeepList from "./DeepList";
import { getComponentsAsPageByFilter, getPageCount } from "../../../services/aggregatorManager";
import { createRule, deleteRule, foreachComponentRule, getSpecificIndex, getStartRule, setSpecificItemToConfiguration } from "../../../services/Rules/RuleManager";

const baseImageUrl = 'http://localhost/images/';

function getSpecificationsList(specifications) {
  const combinedProperties = {};

  specifications.forEach(spec => {
    if (spec.formFactor && spec.formFactor.length > 0) {
      if (!combinedProperties.formFactor) {
        combinedProperties.formFactor = [];
      }
      combinedProperties.formFactor = combinedProperties.formFactor.concat(spec.formFactor);
    }

    if (spec.types && spec.types.length > 0) {
      if (!combinedProperties.types) {
        combinedProperties.types = [];
      }
      combinedProperties.types = combinedProperties.types.concat(spec.types);
    }

    if (spec.manufacturer || spec.cpuManufacturer) {
      const manufacturer = spec.manufacturer || spec.cpuManufacturer;
      const series = spec.series || [];
      const cpuManufacturer = spec.cpuManufacturer ? true : false;

      if (!combinedProperties.manufacturers) {
        combinedProperties.manufacturers = [];
      }

      const existingManufacturer = combinedProperties.manufacturers.find(item => item.manufacturer === manufacturer);

      if (existingManufacturer) {
        existingManufacturer.series = existingManufacturer.series.concat(series);
      } else {
        combinedProperties.manufacturers.push({ manufacturer, series, cpuManufacturer });
      }
    }
  });

  return combinedProperties;
};


export default function ConfiguratorRow({ item, index, assemblyHandler, errorHandler, readyComponents }) {

  const { t, i18n } = useTranslation();

  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuComponents, setMenuComponents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuItemClick = (value) => {
    setSelectedItem(value);
    assemblyHandler(value, item.componentNames[0], item.image);
    handleMenuClose();
    createRule(value, getSpecificIndex(item.componentNames[0]));
  };


  const setReadyItem = (readyComponents) => {
    if (readyComponents && readyComponents.length !== 0) {
      const itemValue = setSpecificItemToConfiguration(readyComponents, getSpecificIndex(item.componentNames[0]))
      if (itemValue) {
        handleMenuItemClick(itemValue);
      }
    }
    else {
      console.log("No ready items!")
    }
  }

  useEffect(() => {
    setReadyItem(readyComponents);
  }, []);

  const handleMenuItemRemove = () => {
    setSelectedItem(null);
    assemblyHandler(null, item.componentNames[0], item.image);
    deleteRule(item.componentNames[0]);
  }

  async function handleMenuOpen(event, index) {
    setAnchorEl(event.currentTarget);
    setMenuOpenIndex(index);
    await getComponents(page);
  };

  async function getComponents(page) {
    // const filter = getStartRule(item.componentNames[0]);
    const filter = foreachComponentRule(item.componentNames[0]);
    const components = await getComponentsAsPageByFilter(errorHandler, page, 4, filter, searchValue);
    // !
    setPageCount(await getPageCount(errorHandler, 4, filter));
    setMenuComponents(components);
  }
  
  const handlePageChange = async (event, value) => {
    setPage(value);
    await getComponents(value);
  }
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }
  
  const handleSearchClick = async () => {
    setPage(1);
    await getComponents(page);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpenIndex(null);
  };

  const handlePropertyValueClick = (value) => {  
    console.log(`Выбрано значение: ${value}`);
  };

  const combinedProperties = getSpecificationsList(item.specifications);

  const propertyLists = [
    { name: 'Form Factors', values: combinedProperties.formFactor },
    { name: 'Types', values: combinedProperties.types }
  ];

  const manufacturerList = combinedProperties.manufacturers
    ? combinedProperties.manufacturers.map(manufacturer => ({
        name: manufacturer.manufacturer,
        values: manufacturer.series,
        isCpuManufacturer: manufacturer.cpuManufacturer
      }))
    : [];

  return (
    <TableRow key={item.id}>

      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={baseImageUrl + item.image} alt={item.image} />
          <Box sx={{ mt: 1.5 }}>{item.componentNames[0]}</Box>
        </Box>
      </TableCell>

      <TableCell>
        <ul>
          {propertyLists.map(specItem => (
            specItem.values && (
              <li key={specItem.name}>
                <div>{specItem.name}:</div>
                <div>
                  {specItem.values.map((property, propertyIndex) => (
                    <Button key={propertyIndex} sx={{ m: 0.5 }} variant="outlined" color="secondary" onClick={() => handlePropertyValueClick(property)}>
                      {property}
                    </Button>
                  ))}
                </div>
              </li>
            )
          ))}
          <DeepList list={manufacturerList} handleValueClick={handlePropertyValueClick}/>
        </ul>
      </TableCell>
      
      <TableCell sx={{ maxWidth: 300 }}>
        {selectedItem ? (
          <>
          <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
            {selectedItem.images.split(',').map((imageName, index) => (
              <div key={index} style={{ marginRight: '8px' }}>
                <Avatar
                  alt={`Image ${index}`}
                  src={baseImageUrl + imageName.trim()}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
              </div>
            ))}
          </div>
    
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <ListItemText
              primary={selectedItem.name}
              secondary={
                <>
                  {selectedItem.description && (
                    <Typography variant="body2" color="textSecondary">
                      {selectedItem.description.length > 50
                        ? `${selectedItem.description.slice(0, 50)}...`
                        : selectedItem.description}
                    </Typography>
                  )}
                  {t("PCValue.price")}: {selectedItem.initialPrice}
                </>
              }
            />

            <IconButton
              color="error"
              size="small"
              onClick={handleMenuItemRemove}
              style={{ position: 'absolute', right: 0, bottom: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
        ) : (
        <>
          <Box
            component="button"
            onClick={(event) => handleMenuOpen(event, index)}
            aria-controls={`menu-${index}`}
            aria-haspopup="true"
            sx={{
              border: '1px dashed',
              borderColor: 'text.primary',
              borderRadius: 1,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '100%',
              height: 100,
            }}
          >
            {selectedItem ? selectedItem.name : t("Find.1")}
          </Box>

          <Menu
            id={`menu-${index}`}
            anchorEl={anchorEl}
            open={menuOpenIndex === index}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            getContentAnchorEl={null}
          >
            <Stack direction='row'>
              <Stack spacing={2} direction='row'>
                <Search>

                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>

                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </Search>
              </Stack>

              <Stack spacing={2} direction='row' justifyContent='flex-end'>
                <Button onClick={handleSearchClick} sx={{ m: 2 }} variant='outlined' color='primary'>Поиск</Button>
              </Stack>
            </Stack>
            
            {menuComponents.map((specification, subIndex) => {
              const modifiedDescription = specification.description
                ? specification.description.replace(specification.name, '')
                : '';
              const truncatedDescription = modifiedDescription.length > 50
                ? `${modifiedDescription.slice(0, 50)}...`
                : modifiedDescription;

              return (
                <MenuItem
                  key={subIndex}
                  onClick={() => handleMenuItemClick(specification)}
                >


                  <ListItemAvatar>
                    <Avatar
                      alt={specification.images.split(',')[0] ?? "alt"}
                      src={baseImageUrl + specification.images.split(',')[0]}
                      variant="rounded"
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={specification.name}
                    secondary={
                      <>
                        {truncatedDescription && (
                          <Typography variant="body2" color="textSecondary">
                            {truncatedDescription}
                          </Typography>
                        )}
                        {t("PCValue.price")}: {specification.initialPrice}
                      </>
                    }
                  />

                </MenuItem>
              );
            })}
            <Stack spacing={2} direction='row' alignItems='center' justifyContent='center'>
              <Pagination count={pageCount} onChange={handlePageChange} variant="outlined" color="secondary" />
            </Stack>
          </Menu>
        </>
        )}

      </TableCell>
    </TableRow>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '3px, solid black',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));