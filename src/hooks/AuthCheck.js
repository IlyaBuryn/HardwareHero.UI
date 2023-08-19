import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isSessionUser } from '../services/userManager';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionUser()) {
      navigate('/unauthorized');
    }
  }, []);

  return isSessionUser();
};

export default useAuthCheck;
