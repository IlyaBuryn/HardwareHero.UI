import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComponentById } from "../../../services/aggregatorManager";
import { Alert, Avatar, Box, Container, Grid, Link, List, ListItem, ListItemAvatar, Paper, Tab, Tabs, Typography } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { themeColors } from "../../../utils/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const baseImageUrl = 'http://localhost/images/';

export default function AggregatorOneElement() {
  const [componentData, setComponentData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const location = useNavigate();
  const { componentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (componentId === null) {
        setComponentData(null);
      } else {
        const componentResponse = await getComponentById(errorHandler, componentId);
        setComponentData(componentResponse);
      }
    };

    fetchData();
  }, []);

  const errorHandler = (str) => {};

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
        <Header />

        {componentData ? (
          <>
            <Container fixed sx={{ mt: 8 }}>
              <Paper elevation={5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                      {selectedImage ? (
                        <Box sx={{ width: "400px", textAlign: "center" }}>
                          <img src={baseImageUrl + selectedImage} alt="Full Image" style={{ maxWidth: "400px" }} />
                        </Box>
                      ) : (
                        <img src={baseImageUrl + componentData.images.split(",")[0]} alt="Full Image" style={{ maxWidth: "400px" }} />
                      )}
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <List sx={{ width: "100%", maxWidth: "auto", overflowX: "auto", display: "flex", flexDirection: "row" }}>
                          {componentData.images.split(",").map((image, index) => (
                            <ListItem key={index} onClick={() => handleImageClick(image)} sx={{ borderRadius: 2, cursor: "pointer", border: selectedImage === image ? "1px solid red" : "none" }}>
                              <ListItemAvatar>
                                <Avatar src={baseImageUrl + image} alt={`Image ${index}`} />
                              </ListItemAvatar>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box p={2}>
                      <Typography variant="h5">{componentData.name}</Typography>
                      <Typography variant="body2">{componentData.description}</Typography>
                    </Box>

                    <Box p={2}>
                      <Typography variant="h5">Specifications:</Typography>
                      <Box sx={{ maxHeight: "200px", overflowY: "clip" }}>
                        {Object.entries(JSON.parse(componentData.specifications)).map(([key, value]) => (
                          <Typography key={key} variant="body2">{`${key}: ${value}`}</Typography>
                        ))}
                      </Box>
                      <Link href="#specification" variant="body2">
                        View all specifications
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Container>

            <Container fixed sx={{ mt: 2 }}>
              <Paper elevation={5}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="Где купить" {...a11yProps(0)} />
                  <Tab label="Характеристики" {...a11yProps(1)} />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  Item One
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  Item Two
                </TabPanel>
              </Paper>
            </Container>
          </>
        ) : (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 700,
          }}>
            <Alert severity="error">
              404: Элемент не был найден!
            </Alert>
          </Box>
        )}
        <Footer />
    </>
  );
};
