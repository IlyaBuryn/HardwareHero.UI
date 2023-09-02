import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { ProductSpecs } from "../ProductTabs/ProductSpecs";
import ButtonTabs from "../../../Common/Tabs/ButtonTabs";

const ProductShowcase = ({ component }) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleButtonClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Grid container spacing={1} sx={{ mt: 5 }}>

      <Grid item xs={12} sx={{ mb: 3}} container justifyContent="space-between">
        <Typography variant="h4">{component.name}</Typography>
        <div>
          <Button startIcon={<PlaylistAddIcon />}><span>Добавить в список желаемого</span></Button>
          <Button startIcon={<AddCircleIcon />}><span>Добавить в сборку</span></Button>
        </div>
      </Grid>

      <Grid item xs={12} sx={{ backgroundColor: 'secondary.light' }}>
        <ButtonTabs values={[ 'Описание и фото', 'Описание и фото', 'Отзывы' ]} activeTab={activeTab} handleClick={handleButtonClick} />
      </Grid>

      {activeTab === 0 && (
        <ProductSpecs component={component} />
      )}
      {activeTab === 1 && (
        <>
          {/* <ProductPrices component={component} /> */}
        </>
      )}
      {activeTab === 2 && (
        <>
          {/* <ProductReviews  component={component} /> */}
        </>
      )}

    </Grid>
  );
}

export default ProductShowcase;
