import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserManager } from '../services/userManager';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const userManager = useUserManager();

  useEffect(() => {
    try {
      if (!userManager.isLoggedIn()) {
        navigate('/unauthorized');
      }
    }
    catch (ex) {
      navigate('/home?error=' + ex.message)
    }
  }, []);

  return userManager.isLoggedIn();
};

export default useAuthCheck;
