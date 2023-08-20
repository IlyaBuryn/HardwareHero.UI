import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { isSessionUser } from '../services/userManager';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (!isSessionUser()) {
        navigate('/unauthorized');
      }
    }
    catch (ex) {
      navigate('/home?error=' + ex.message)
    }
  }, []);

  return isSessionUser();
};

export default useAuthCheck;
