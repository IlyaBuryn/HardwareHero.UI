import Cookies from 'js-cookie';

import { useFetch } from '../hooks/useFetch';


export const useUserManager = () => {

  const client = useFetch();
  const loginApiRoute = 'gateway/sign-in';
  const signInApiRoute = 'gateway/sign-up';
  const getUserByIdRoute = 'gateway/user/'
  const returnUrl = 'http://localhost/home';

  const signIn = async (username, password, rememberLogin) => {
    logout();
    
    if (!username || !password) {
      return {'message': 'Validation error!', 'type': 'error'};
    }
    
    try {
      var responseBody = await client.postOne(loginApiRoute, JSON.stringify({
        username,
        password,
        returnUrl,
        rememberLogin
      }), null);
      var responseJson = await client.getJsonResponse(responseBody)
    
      if (responseJson) {
        login(responseJson);
        return {'message': 'Вы успешно вошли!', 'type': 'success'};
      }

      return null;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  const signUp = async (fullName, username, email, password) => {
    logout();
    if (!fullName || !username || !email || !password) {
      return {'message': 'Validation error!', 'type': 'error'};;
    }
  
    try {
      var responseBody = await postOne(signInApiRoute, JSON.stringify({
        fullName,
        username,
        password,
        email,
        returnUrl
      }), null);
      var responseJson = await getJsonResponse(responseBody)
    
      if (responseJson) {
        login(responseJson);
        return {'message': 'Вы успешно зарегистрировались!', 'type': 'success'};
      }
      
      return null;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
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
    }
    catch (ex) {
      return { message: ex.message, type: 'error' };
    }

    return { message: 'Вы успешно вышли!', type: 'success' };
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
    } catch (ex) {
        return { message: ex.message, type: 'error' };
    }

    return { message: 'Вы успешно вошли!', type: 'success' };
};



  const getUserById = async (userId) => {
    try {
      var responseBody = await client.getOne(getUserByIdRoute + userId, null);
      var responseJson = await client.getJsonResponse(responseBody);
    
      if (responseJson) {
        return responseJson;
      };
    
      return null;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
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

      return userInfo;
    } 
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
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
      const user = getUserSessionInfo();
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
    const user = getUserSessionInfo();
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
    const user = getUserSessionInfo();
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