import Cookies from 'js-cookie';

import { useFetch } from '../hooks/useFetch';
import { useApiRoutes } from '../data/apiRoutes';
import { ResponseMessage } from '../utils/responseMessage';


export const useUserManager = () => {

  const client = useFetch();
  const api = useApiRoutes();
  const returnUrl = 'http://localhost/home';

  const signIn = async (username, password, rememberLogin) => {
    logout();
    
    if (!username || !password) {
      return ResponseMessage('Validation error!', 'error');
    }
    
    try {
      var responseBody = await client.postOne(api.identityRoutes['signIn'], JSON.stringify({
        username,
        password,
        returnUrl,
        rememberLogin
      }), null);
      var responseJson = await client.getJsonResponse(responseBody)
    
      if (responseJson) {
        login(responseJson);
        return ResponseMessage('Вы успешно вошли!', 'success', responseJson);
      }

      throw new Error('Server is unavailable!');
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }

  const signUp = async (fullName, username, email, password) => {
    logout();
    if (!fullName || !username || !email || !password) {
      return ResponseMessage('Validation error!', 'error');
    }
  
    try {
      var responseBody = await postOne(api.identityRoutes['signUp'], JSON.stringify({
        fullName,
        username,
        password,
        email,
        returnUrl
      }), null);
      var responseJson = await getJsonResponse(responseBody)
    
      if (responseJson) {
        login(responseJson);
        return ResponseMessage('Вы успешно зарегистрировались!', 'success', responseJson);
      }
      
      throw new Error('Server is unavailable!');
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }


  const logout = async () => {
    const cookieNames = [
      'accessToken', 'expiresIn', 'tokenIssuedAt', 'tokenType', 
      'scope', 'userId', 'userName', 'fullName', 'email', 'roles'
    ];

    try {
      Cookies.set('loggedIn', false);
      for (const name of cookieNames) {
        Cookies.remove(name);
      }
      
      return ResponseMessage('Вы успешно вышли!', 'success');
    }
    catch (ex) {
      return ResponseMessage(ex.Message, 'error');
    }
  }
  

  const login = async (responseJson) => {
    const token = responseJson.token;
    const cookieNamesInToken = ['accessToken', 'expiresIn', 'tokenType'];
    const cookieNamesCommon = ['scope', 'userId', 'userName', 'fullName', 'email', 'roles'];

    try {
      Cookies.set('loggedIn', true);
      Cookies.set('tokenIssuedAt', Math.floor(Date.now() / 1000));

      for (const name of cookieNamesInToken) {
        Cookies.set(name, token[name]);
      }

      for (const name of cookieNamesCommon) {
        Cookies.set(name, responseJson[name]);
      }

      return ResponseMessage('Вы успешно вышли!', 'success');
    } 
    catch (ex) {
      return ResponseMessage(ex.Message, 'error');
    }
  };


  const getUserById = async (userId) => {
    try {
      var responseBody = await client.getOne(api.identityRoutes['userById'] + userId, null);
      var responseJson = await client.getJsonResponse(responseBody);
    
      if (responseJson) {
        return ResponseMessage(null, 'success', responseJson)
      };
    
      throw new Error('Server is unavailable!')
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }


  const getUserSessionInfo = () => {
    const cookieNames = [
      'accessToken', 'expiresIn', 'tokenIssuedAt', 'tokenType',
      'scope', 'userId', 'userName', 'fullName', 'email', 'roles', 'loggedIn'
    ];

    try {
      const userInfo = {};

      for (const name of cookieNames) {
          userInfo[name] = Cookies.get(name);
      }

      return ResponseMessage(null, 'success', userInfo);
    } 
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  };


  const isAccessTokenNotExpire = () => {
    try {
      const expiresIn = Cookies.get('expiresIn');
      const tokenIssuedAt = Cookies.get('tokenIssuedAt');
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpirationTime = tokenIssuedAt + expiresIn;

      return currentTime < tokenExpirationTime;
    }
    catch (ex) {
      return false;
    }
  }


  const isLoggedIn = () => {
    try {
      const user = getUserSessionInfo().responseValue;
      if (!user.loggedIn) {
        return false;
      }
      else if (!isAccessTokenNotExpire()) {
        logout();
        return false;
      }
      else {
        return true;
      }
    }
    catch (ex) {
      return false;
    }
  }


  const getUserRole = () => {
    const user = getUserSessionInfo().responseValue;
    const roles = ['Admin', 'Manager', 'Contributor', 'User'];
    if (user && isLoggedIn()) {
      for (let role of roles) {
        if (user.roles.includes(role)) {
          return role;
        }
      }
    }
  }


  const isUserHasRole = (role) => {
    const user = getUserSessionInfo().responseValue;
    if (user && isLoggedIn()) {
      if (user.roles.includes(role)) {
        return true;
      }
    }
    return false;
  }


  return {
    signIn,
    signUp,
    logout,
    login,

    getUserById,
    getUserSessionInfo,
    isAccessTokenNotExpire,
    isLoggedIn,

    getUserRole,
    isUserHasRole
  };
}