import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia,
  Typography, Pagination, Box,
  CircularProgress, Paper, Avatar,
  Button, Stack, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getComponentsAsPageByFilter, getPageCount } from '../../../services/aggregatorManager';
import { useErrorMessage, ErrorSnackbar } from '../../Common/Snackbar/ErrorSnackbar';

const baseImageUrl = 'http://localhost/images/';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
}));


const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 100,
  height: 100,
}));


const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
  maxWidth: 400,
}));


function AggregatorItems() {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();
  const { t, i18n } = useTranslation();

  const itemsPerPage = 10;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearErrorMessage();

        await trySetData(1);

      } catch (error) {
        handleErrorMessageChange(error.message);
        handleLoadingChange(false);
      }
    };

    fetchData();
  }, []);


  const trySetData = async (page) => {
    handleLoadingChange(true);
    const filter = '{}';
    const components = await getComponentsAsPageByFilter(handleErrorMessageChange, page, itemsPerPage, filter, searchValue);
    console.log(components);
    setData(components)
    setPageCount(await getPageCount(handleErrorMessageChange, itemsPerPage, filter, searchValue));
    handleLoadingChange(false); 
  }

  const addToWishList = (item) => {
    // Add logic for adding item to wishlist
  }

  const viewPrices = (item) => {
    // Add logic for viewing prices
  }

  const dropDownPrices = (item) => {
    // Add logic for dropdown prices list
  }


  const handleChange = async (event, value) => {
    setPage(value);
    await trySetData(value);
  };


  const handleLoadingChange = (hide) => {
    setLoading(hide);
  };
  

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
        <CircularProgress size={100} />
      </Box>
    );
  }


  return (
    <>
      {!error.hidden ? (
        <ErrorSnackbar
          sx={{ margin: '0 auto', mt: 15 }}
          hidden={error.hidden}
          message={error.message}
        />
      ) : null}

      <Stack sx={{ mt: 4 }} spacing={2} direction="column" alignItems="center">
        {data.map(item => (
          <Paper elevation={5} sx={{ maxWidth: '80%' }}>
            <StyledCard>

              <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                {(item.images.split(',').length >=2 ? item.images.split(',').slice(0,2) : [...item.images.split(','), ...Array(2 - item.images.split(',').length).fill('')]).map((imageName,index) => (
                  <div key={index} style={{ marginRight: '8px' }}>
                    <Avatar
                      alt={`Image ${index}`}
                      src={imageName.trim() ? baseImageUrl + imageName.trim() : ''}
                      variant="rounded"
                      sx={{ width: 128, height: 128, m: 2 }}
                    />
                  </div>
                ))}
              </div>

              <StyledCardMedia
                image={item.images.split(',')[0]}
                title={item.name}
              />

              <StyledCardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </StyledCardContent>

              <Stack sx={{ m: 2 }} direction='row' alignItems="center">
                <Stack spacing={3} direction="column" alignItems="center">
                  <Typography variant="h6" component="div">
                    ~{item.initialPrice}
                  </Typography>


                  <IconButton onClick={() => dropDownPrices(item)} variant='outlined'>
                    <ExpandMoreIcon />
                  </IconButton>

                </Stack>
              </Stack>

              <Stack sx={{ m: 2 }} direction='row' alignItems="center">
                <Stack spacing={3} direction="column" alignItems="center">
                  <Button variant='outlined' onClick={() => addToWishList(item)} startIcon={<PlaylistAddIcon />}>Add to Wishlist</Button>
                  <Button variant='contained' onClick={() => viewPrices(item)} startIcon={<PriceCheckIcon />}>View Prices</Button>
                </Stack>
              </Stack>

            </StyledCard>
          </Paper>
        ))}
      </Stack>

      <Stack spacing={4} direction="column" alignItems="center">
        <Pagination sx={{ mt: 4 }} count={pageCount} page={page} onChange={handleChange} />
      </Stack>
    </>
  );
}


export default AggregatorItems;
