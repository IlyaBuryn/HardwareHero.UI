import { useEffect, useState } from 'react';
import { useAggregatorManager } from '../services/aggregatorManager';
import { useNavigate } from 'react-router-dom';

const useProductData = (componentId, prevRoute) => {

  const aggregatorManager = useAggregatorManager();
  const navigate = useNavigate();

  const [component, setComponent] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      if (componentId) {
        const responseMessage = await aggregatorManager.getComponentById(componentId);
        if (responseMessage && responseMessage.responseValue !== null) {
          setComponent(responseMessage.responseValue);
          setIsLoadingPage(false);
        } else {
          navigate(`/not-found${prevRoute}`, { replace: true });
        }
      }
    };

    getProductData();
  }, [componentId, prevRoute]);

  return { component, isLoadingPage };
};

export default useProductData;
