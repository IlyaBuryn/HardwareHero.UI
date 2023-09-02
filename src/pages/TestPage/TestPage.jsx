import React from 'react';

import Header from '../../components/Layout/Header/Header';
import { useSnackbarQueue } from '../../components/Common/Snackbar/SnackbarQueue';


const TestPage = () => {

  return (
    <>
      <Header breadcrumbItems={[{ label: 'Home', url: '/home' },{ label: 'Tests' }]}/>
    </>
  );
}

export default TestPage;