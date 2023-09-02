import React from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";

import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import LoadingCircularProgress from "../../components/Common/Progress/LoadingCircularProgress";
import useProductData from "../../hooks/useProductData";
import ProductShowcase from "../../components/Layout/Product/ProductShowcase/ProductShowcase";

const ProductPage = () => {

  const { componentId } = useParams();
  const { component, isLoadingPage } = useProductData(componentId, '/prices');

  if (isLoadingPage) {
    return (
      <LoadingCircularProgress />
    );
  }

  return (
    <>
      <Header breadcrumbItems={[{ label: 'Home', url: '/' },{ label: 'Prices', url: '/prices'},{ label: component.name ?? '?' }]}/>
      <Container fixed>
        <Box >
          <ProductShowcase component={component} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ProductPage;