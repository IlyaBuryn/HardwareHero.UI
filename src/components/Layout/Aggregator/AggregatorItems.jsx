import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia,
  Typography, Pagination, Box,
  CircularProgress, Paper, Avatar, Container,
  Button, Stack, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAggregatorManager } from '../../../services/aggregatorManager';
import { useErrorMessage, ErrorSnackbar } from '../../Common/Snackbar/ErrorSnackbar';
import CanvasGraph from '../../Common/Graph/CanvasGraph';
import { useNavigate } from 'react-router-dom';

const baseImageUrl = 'http://localhost/images/';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
}));

const superData = [
  {
    id: 1,
    image: "https://ram.by/images/logo.png",
    name: "Ram.by",
    quantity: 59.99,
    prices: [ 60, 40, 70, 59.99,]
  },
  {
    id: 2,
    image: "https://imgproxy.onliner.by/2zEP45MryJX_vTY39kUaP0bn69iivuOYU2GTlfbEX48/w:152/h:56/dpr:2/f:webp/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvYjJiLzI2MTEv/bG9nb3R5cGUvNDkw/NDg5ZTY5M2JmMDUw/MWQ3Y2ZhZWJmMDI1/YTlmZmMuanBlZw",
    name: "KST",
    quantity: 67.23,
    prices: [ 20, 40, 30, 67.23,]
  },
  {
    id: 3,
    image: "https://imgproxy.onliner.by/Pmhe8e9bGlP7DOJtYXXbEiYPttbfqrX1fDN02VTWahg/w:152/h:56/dpr:2/f:webp/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvYjJiLzE3NDgv/bG9nb3R5cGUvMDBl/ZThkYjdkMDI0OTY5/YzRkNjlhOTEwZmM2/NzY3MzIucG5n",
    name: "Sli",
    quantity: 100.00,
    prices: [ 50, 40, 70, 100.00,]
  },
  {
    id: 3,
    image: "https://imgproxy.onliner.by/KCfJD4VGmc4pAloX_7NpnpHPPafU5fnfCg7CohuY1zg/w:152/h:56/dpr:2/f:webp/aHR0cHM6Ly9jb250/ZW50Lm9ubGluZXIu/YnkvYjJiLzE0ODA3/L2xvZ290eXBlLzNl/Yzk5ZmIwYWFiMGZj/NGJkMTA0NjQzMDc1/MDQxYmQyLnBuZw",
    name: "STOX",
    quantity: 130.00,
    prices: [ 200, 30, 150, 130.00,]
  }
];

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
  const [expandedItems, setExpandedItems] = useState([]);

  const [error, handleErrorMessageChange, clearErrorMessage] = useErrorMessage();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const aggregatorManager = useAggregatorManager();

  const itemsPerPage = 10; // TODO: 10
  

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

  const handleSearchButtonClick = async () => {
    console.log('Выполняется поиск:', searchValue);
    setPage(1);
    await trySetData(1);
  }


  const trySetData = async (page) => {
    handleLoadingChange(true);
    const filter = '{}';
    const components = (await aggregatorManager.getComponentsAsPageByFilter(page, itemsPerPage, filter, searchValue)).responseValue;
    setData(components)
    setPageCount(await aggregatorManager.getPageCount(itemsPerPage, filter, searchValue).responseValue);
    handleLoadingChange(false); 
  }

  const addToWishList = (item) => {
    // Add logic for adding item to wishlist
  }

  const viewPrices = (item) => {
    navigate('/prices/' + item.id)
  }

  const dropDownPrices = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };


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


        <Container fixed>
          <Paper elevation={5}>

            <Typography sx={{ m: 3, pt: 3 }} variant="h5" component="div">
              Фильтры
            </Typography>

            <Stack sx={{ m: 2 }} spacing={2} direction="column">

              <Stack sx={{ margin: 2 }} spacing={2} direction="row">
                <TextField onChange={handleSearchChange} value={searchValue} fullWidth label="Строка для поиска" />
                <Button onClick={() => handleSearchButtonClick()} variant="contained" color="primary">
                  Поиск
                </Button>
              </Stack>

              <Stack sx={{ m: 2 }} spacing={2} direction="row">
                <FormControl sx={{ pl: 2 }} fullWidth>
                  <InputLabel sx={{ pl: 2 }} id="region-label">Отобразить цены в регионе</InputLabel>
                  <Select labelId="region-label" id="region-select">
                    <MenuItem value="region1">Беларусь</MenuItem>
                    <MenuItem value="region2">Россия (Москва)</MenuItem>
                    <MenuItem value="region3">Россия (Санкт-Петербург)</MenuItem>
                    <MenuItem value="region4">Польша</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ pr: 2 }} fullWidth>
                  <InputLabel id="region-label">Сортировать по:</InputLabel>
                  <Select labelId="region-label" id="region-select">
                    <MenuItem value="region1">-</MenuItem>
                    <MenuItem value="region2">Популярности</MenuItem>
                    <MenuItem value="region3">Релевантности</MenuItem>
                    <MenuItem value="region4">Цене</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Stack sx={{ margin: 3 }} spacing={2} direction="row">
                <Link sx={{ m: 1 }}>Процессоры</Link>
                <Link sx={{ m: 1 }}>материнские платы</Link>
                <Link sx={{ m: 1 }}>Видеокарты</Link>
                <Link sx={{ m: 1 }}>Оперативная память</Link>
                <Link sx={{ m: 1 }}>Схемы охлаждения</Link>
                <Link sx={{ m: 1 }}>Жесткие диски, SSD, M2</Link>
                <Link sx={{ m: 1 }}>Корпуса</Link>
                <Link sx={{ m: 1 }}>Блоки питания</Link>
              </Stack>
            </Stack>
          </Paper>
        </Container>

        {data.map((item) => (
          <Container fixed>
            <Paper elevation={5} key={item.id}>
              <StyledCard>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                  }}
                >
                  {(item.images.split(',').length >= 2
                    ? item.images.split(',').slice(0, 2)
                    : [...item.images.split(','), ...Array(2 - item.images.split(',').length).fill('')]
                  ).map((imageName, index) => (
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

                <StyledCardMedia image={item.images.split(',')[0]} title={item.name} />

                <StyledCardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </StyledCardContent>

                <Stack sx={{ m: 2 }} direction="row" alignItems="center">
                  <Stack spacing={3} direction="column" alignItems="center">
                    <Typography variant="h6" component="div">
                      ~{item.initialPrice} BYN
                    </Typography>

                    <IconButton
                      onClick={() => dropDownPrices(item.id)}
                      variant="outlined"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack sx={{ m: 2 }} direction="row" alignItems="center">
                  <Stack spacing={3} direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      onClick={() => addToWishList(item)}
                      startIcon={<PlaylistAddIcon />}
                    >
                      Добавить в список желаемого
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => viewPrices(item)}
                      startIcon={<PriceCheckIcon />}
                    >
                      Просмотр всех цен
                    </Button>
                  </Stack>
                </Stack>
              </StyledCard>
            </Paper>
            {expandedItems.includes(item.id) ? (
            <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {superData.map((item) => (
                <Stack sx={{ m: 2 }} direction="row" alignItems="center">
                  <Box width="200px">
                    <Stack direction="column" sx={{ width: '200px' }} alignItems="center">
                      <Avatar
                        alt={`Image ${item.id}`}
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 64, height: 64, m: 2 }}
                      />
                      <Typography variant="h6" color="text.secondary">
                        В магазине: {item.name}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Цена в магазине: {item.quantity} BYN
                      </Typography>

                      <CanvasGraph prices={item.prices} />

                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Paper>
            ) : (null)}
          </Container>
        ))}
        <Stack spacing={4} direction="column" alignItems="center">
          <Pagination sx={{ mt: 4 }} count={pageCount} page={page} onChange={handleChange} />
        </Stack>
      </Stack>
    </>
  );
}


export default AggregatorItems;
