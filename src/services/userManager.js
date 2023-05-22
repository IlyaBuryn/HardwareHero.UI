import Cookies from 'js-cookie';

import { postOne, getJsonResponse } from './../utils/clientConnect';

const loginApiRoute = 'gateway/sign-in';
const signInApiRoute = 'gateway/sign-up';

const returnUrl = 'http://localhost/home';

export async function signIn(username, password, rememberLogin, handleErrorMessageChange) {

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

  if (responseJson) {
    console.log(responseJson);
    setUserToCookie(responseJson);
    window.location.reload();
  }
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

  if (responseJson) {
    console.log(responseJson);
    setUserToCookie(responseJson);
    window.location.reload();
  }
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
    Cookies.remove('roles');

    window.location.reload();
  }
  catch (ex) {
    console.log("Error");
  }
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
    const roles = Cookies.get('roles');
  
    return {
      accessToken, expiresIn, tokenType, scope, tokenIssuedAt,
      userId, userName, fullName, roles
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
    return true; // Токен истек
  } else {
    return false; // Токен действителен
  }
}
