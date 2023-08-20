import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { checkUserRole, getUserRole } from '../services/userManager';


const useRoleCheck = () => {

  const navigate = useNavigate();
  const [roleResult, setRoleResult] = useState(false);

  useEffect(() => {
    try {
      var role = getUserRole();
      setRoleResult(checkUserRole(role))

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
