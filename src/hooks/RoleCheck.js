import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserManager } from '../services/userManager';


const useRoleCheck = () => {

  const navigate = useNavigate();
  const [roleResult, setRoleResult] = useState(false);
  const userManager = useUserManager();

  useEffect(() => {
    try {
      var role = userManager.getUserRole();
      setRoleResult(userManager.isUserHasRole(role))

      if (!roleResult) {
        navigate('/forbidden');
      }
    }
    catch (ex) {
      navigate('/home?error=' + ex.message)
    }
  }, []);

  return roleResult;
};


export default useRoleCheck;
