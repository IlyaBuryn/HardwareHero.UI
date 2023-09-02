import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

import { useConstants } from '../../../../data/constants';
import './ProductSpecs.css';


export const ProductSpecs = ({ component }) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [hoveredImageIndex, sethoveredImageIndex] = useState(-1);
  const constants = useConstants();

  return (
    <>
      <Grid ontainer xs={9} className="right-out-border">
        <Stack direction='column'>

          <Box item display='flex'>
            <img src={constants.baseImageUrl + component.images.split(",")[0]} alt={component.name} style={{ width: '300px', padding: 10 }} />
            <div>
              <Typography sx={{ p: 1 }} variant="h6">{component.name}</Typography>
              <Typography sx={{ p: 1 }}>{component.description}</Typography>
              <Typography sx={{ p: 1 }}>{component.initialPrice}</Typography>
            </div>
          </Box>

          <Box item display='flex' overflow='auto' className="inner-top-border image-list">
          {component.images.split(",").map((image, index) => (
            <div key={index} style={{ border: selectedImageIndex === index ? '3px solid black' : 'none', }}>
              <img 
                onMouseEnter={() => sethoveredImageIndex(index)}
                onMouseLeave={() => sethoveredImageIndex(-1)}
                onClick={() => setSelectedImageIndex(index)}
                src={constants.baseImageUrl + image} 
                alt={component.name} 
                style={{ width: '150px', 
                  opacity: hoveredImageIndex === index ? 0.7 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                  padding: 10, }} />
            </div>
          ))}
          </Box>

          {selectedImageIndex >= 0 ? (
            <Box item display="flex" flexDirection="column" className="inner-top-border selected-image">
              <img
                src={constants.baseImageUrl + component.images.split(",")[selectedImageIndex]}
                style={{ width: '100%', maxWidth: '100%' }}
                alt={component.name}
              />
              <div style={{ alignSelf: 'flex-end', position: 'absolute', top: '10px', right: '10px' }}>
                <IconButton size="large" sx={{ bgcolor: 'secondary.light' }} onClick={() => setSelectedImageIndex(-1)}>
                  <CloseIcon size="large" />
                </IconButton>
              </div>
            </Box>
          ) : null}

        </Stack>

      </Grid>

      <Grid containers xs={3} className="left-out-border">
        <Paper>
        </Paper>
      </Grid>
    </>
  );
}