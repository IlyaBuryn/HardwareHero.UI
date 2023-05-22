import Cookies from 'js-cookie';

function getAccessTokenFromCookie() {
  const accessToken = Cookies.get('accessToken');
  if (accessToken != null) {
    return 'Bearer ' + accessToken;
  }
  else {
    return '';
  }
}

export async function getJsonResponse(response, errorHandler) {
  try {
    const responsejson = await response.json();

    if (!response.ok) {
      errorHandler(responsejson.Message);
      return null;
    }

    return responsejson;
  }
  catch (ex) {
    errorHandler('Server is unavailable!');
  }
}

export async function postOne(route, errorHandler, data, headers) {
  try {


    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessTokenFromCookie(),
        headers
      },
      credentials: 'include',
      body: data
    });

    return response;
  }
  catch (ex) {
    errorHandler('Server is unavailable!');
  }
}

export async function getAll(route, errorHandler, data, headers) {
  try {
    const response = await fetch(route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessTokenFromCookie(),
        headers
      },
      credentials: 'include',
      body: data
    });

    return response;
  }
  catch (ex) {
    errorHandler('Server is unavailable!');
  }
}

export async function getOne(route, errorHandler, headers) {

}

export async function putOne(route, errorHandler, data, headers) {

}

export async function deleteOne(route, errorHandler, headers) {

}