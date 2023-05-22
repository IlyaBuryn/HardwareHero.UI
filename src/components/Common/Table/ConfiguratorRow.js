import React, { useState } from "react";
import { TableRow, TableCell, Button, Menu, MenuItem, ListItemText, Avatar, ListItemAvatar, Box } from "@mui/material";
import { useTranslation } from 'react-i18next';
import DeepList from "./DeepList";

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


export default function ConfiguratorRow({ item, index }) {

  const { t, i18n } = useTranslation();

  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    handleMenuClose();
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuOpenIndex(index);
  };

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
        <img src={baseImageUrl + item.image} alt={item.image} />
        <Box sx={{ textAlign: 'center', mt: 1.5 }}>{item.componentNames[0]}</Box>
      </TableCell>

      <TableCell>
        <ul>
          {propertyLists.map(specItem => (
            specItem.values && (
              <li key={specItem.name}>
                <div>{specItem.name}:</div>
                <div>
                  {specItem.values.map((property, propertyIndex) => (
                    <Button key={propertyIndex} onClick={() => handlePropertyValueClick(property)}>
                      {property}
                    </Button>
                  ))}
                </div>
              </li>
            )
          ))}
          <DeepList list={manufacturerList} handleValueClick={handlePropertyValueClick}/>
        </ul>
          {// getSpecificationsList(item.specifications).map((property, propertyIndex) => {
            // if (property !== 'series' && property !== 'manufacturer' && property !== 'cpuManufacturer') {
            //   return (
            //   <li key={propertyIndex}>
            //     <div>{property}:</div>
            //     <div>
            //       {getSpecificationValues(item.specifications, property).map((value, valueIndex) => {
            //         if (property !== 'manufacturer' && property !== 'cpuManufacturer') {
            //           return (
            //             <Button
            //               key={valueIndex}
            //               onClick={() => handlePropertyValueClick(value, item.specifications)}
            //             >
            //               {value}
            //             </Button>
            //           );
            //         } else {
            //           return <div key={valueIndex}>{value}</div>;
            //         }
            //       })}
            //     </div>
            //   </li>
            // )}
            // else if (property === 'manufacturer' || property === 'cpuManufacturer') {
            //   const specificationWithSeries = findSpecificationByProperty(
            //     item.specifications,
            //     'series'
            //   );
            //   if (!specificationWithSeries) {
            //     return (
            //       <li key={propertyIndex}>
            //         <div>{property}:</div>
            //         <div>
            //           {getManufacturerValues(item.specifications, property).map(
            //             (value, valueIndex) => (
            //               <Button key={valueIndex} onClick={() => handlePropertyValueClick(value, item.specifications)}>
            //                   {value.value}
            //               </Button>
            //             )
            //           )}
            //         </div>
            //       </li>
            //     );
            //   }

            //   return (
            //     <li key={propertyIndex}>
            //       <div>{property}:</div>
            //       <div>
            //         <Button
            //           onClick={() =>
            //             openDialogWithSeriesValues(
            //               getSpecificationValues([specificationWithSeries], 'series')
            //             )
            //           }
            //         >
            //           {property}
            //         </Button>
            //       </div>
            //     </li>
            //   );
            // }

          //})
          }
      </TableCell>
      
      <TableCell>
        <Button
          onClick={(event) => handleMenuOpen(event, index)}
          aria-controls={`menu-${index}`}
          aria-haspopup="true"
        >
          {t("Find.1")}
        </Button>
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
          {item.specifications.map((specification, subIndex) => (
            <MenuItem
              key={subIndex}
              onClick={() => handleMenuItemClick(specification)}
            >
              <ListItemAvatar>
                <Avatar src={baseImageUrl + specification.image} alt="img" />
              </ListItemAvatar>
              <ListItemText
                primary={specification.name}
                secondary={`Цена: ${specification.price}`}
              />
            </MenuItem>
          ))}
        </Menu>
      </TableCell>
    </TableRow>
  )
}