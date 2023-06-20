import Cookies from 'js-cookie';

import { postOne, getJsonResponse, getOne } from './../utils/clientConnect';

const loginApiRoute = 'gateway/sign-in';
const signInApiRoute = 'gateway/sign-up';
const getUserByIdRoute = 'gateway/user/'

const returnUrl = 'http://localhost/home';

export async function signIn(username, password, rememberLogin, handleErrorMessageChange) {

  logout(handleErrorMessageChange);
  localStorage.removeItem('successMessage');
  
  if (!username || !password)
  {
    handleErrorMessageChange('Validation error!');
    return;
  }

  var responseBody = await postOne(loginApiRoute, handleErrorMessageChange, JSON.stringify({
    username,
    password,
    returnUrl,
    rememberLogin
  }), null);

  var responseJson = await getJsonResponse(responseBody, handleErrorMessageChange)

  if (responseJson && responseBody.ok) {
    setUserToCookie(responseJson);
    localStorage.setItem('successMessage', 'Вы успешно вошли!');
    return 'Вы успешно вошли!'
  }
  return null;
}

export async function signUp(fullName, username, email, password, handleErrorMessageChange) {

  if (!fullName || !username || !email || !password)
  {
    handleErrorMessageChange('Validation error!');
    return;
  }

  var responseBody = await postOne(signInApiRoute, handleErrorMessageChange, JSON.stringify({
    fullName,
    username,
    password,
    email,
    returnUrl
  }), null);

  var responseJson = await getJsonResponse(responseBody, handleErrorMessageChange)

  if (responseJson && responseBody.ok) {
    setUserToCookie(responseJson);
    localStorage.setItem('successMessage', 'Вы успешно зарегистрировались!');
    CheckAndRedirect();
  }
  return null;
}


export function CheckAndRedirect() {
  window.location.reload();
}

export async function logout(handleErrorMessageChange) {
  try {
    Cookies.remove('accessToken');
    Cookies.remove('expiresIn');
    Cookies.remove('tokenIssuedAt');
    Cookies.remove('tokenType');
    Cookies.remove('scope');

    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('fullName');
    Cookies.remove('email');
    Cookies.remove('roles');

    localStorage.setItem('successMessage', 'Вы успешно вышли!');
    return null;
  }
  catch (ex) {
    console.log("Error");
  }
}

export async function getUserById(userId, errorHandler) {
  var responseBody = await getOne(getUserByIdRoute + userId, errorHandler, null);
  var responseJson = await getJsonResponse(responseBody, errorHandler);

  if (responseJson && responseBody.ok) {
    return responseJson;
  };

  return null;
}

export function setUserToCookie(responseJson) {
  try {
    Cookies.set('accessToken', responseJson.token.accessToken);
    Cookies.set('expiresIn', responseJson.token.expiresIn);
    Cookies.set('tokenIssuedAt', Math.floor(Date.now() / 1000));
    Cookies.set('tokenType', responseJson.token.tokenType);
    Cookies.set('scope', responseJson.token.scope);

    Cookies.set('userId', responseJson.userId);
    Cookies.set('userName', responseJson.userName);
    Cookies.set('fullName', responseJson.fullName);
    Cookies.set('email', responseJson.email);
    Cookies.set('roles', responseJson.roles);
  }
  catch (ex) {
    console.log("Error");
  }
}


export function getUserFromCookie() {
  try {
    const accessToken = Cookies.get('accessToken');
    const expiresIn = Cookies.get('expiresIn');
    const tokenIssuedAt = Cookies.get('tokenIssuedAt');
    const tokenType = Cookies.get('tokenType');
    const scope = Cookies.get('scope');

    const userId = Cookies.get('userId');
    const userName = Cookies.get('userName');
    const fullName = Cookies.get('fullName');
    const email = Cookies.get('email');
    const roles = Cookies.get('roles');
  
    return {
      accessToken, expiresIn, tokenType, scope, tokenIssuedAt,
      userId, userName, fullName, email, roles
    }
  }
  catch (ex) {
    console.log("Error");
  }
}

export function checkAccessTokenExpire() {
  const expiresIn = Cookies.get('expiresIn');
  const tokenIssuedAt = Cookies.get('tokenIssuedAt');
  const currentTime = Math.floor(Date.now() / 1000);
  const tokenExpirationTime = tokenIssuedAt + expiresIn;

  if (currentTime >= tokenExpirationTime) {
    return true;
  } else {
    return false;
  }
}

export function isSessionUser() {
  try {
    var user = getUserFromCookie();
    if (user && user.accessToken && user.userName && !checkAccessTokenExpire()) {
      return true;
    }
    return false;
  }
  catch (ex) {
    return false;
  }
}

export function getUserRole() {
  const user = getUserFromCookie();
  const roles = ['Admin', 'Manager', 'Contributor', 'User'];
  if (user && isSessionUser) {
    for (let role of roles) {
      if (user.roles.includes(role)) {
        return role;
      }
    }
  }
}

export function checkUserRole(role) {
  const user = getUserFromCookie();
  if (user !== null && isSessionUser() === true) {
    if (user.roles.includes(role)) {
      return true;
    }
  }
  return false;
}