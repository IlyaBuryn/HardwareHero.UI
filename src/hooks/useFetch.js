import Cookies from 'js-cookie';

export const useFetch = () => {

  const getAccessToken = () => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      return 'Bearer ' + accessToken;
    }
    else {
      return '';
    }
  }

  const getJsonResponse = async (response) => {
    const responsejson = await response.json();
    if (!response.ok) {
      throw new Error(responseJson.Message);
    }
  
    return responsejson;
  }

  const postOne = async (route, data, headers) => {  
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        headers
      },
      credentials: 'include',
      body: data
    });

    return response;
  }

  const getMany = async (route, data, headers) => {
    const response = await fetch(route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        ...headers
      },
      credentials: 'include',
      body: data
    });

    return response;
  }

  const getOne = async (route, headers) => {
    const response = await fetch(route, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        ...headers
      }
    });

    return response;
  }

  const putOne = async (route, data, headers) => {
    const response = await fetch(route, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        ...headers
      },
      credentials: 'include',
      body: data
    });

    return response;
  }

  const deleteOne = async (route, headers) => {
    const response = await fetch(route, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getAccessToken(),
        ...headers
      }
    });

    return response;
  }

  const postImage = async (route, file, fileName) => {
    const formData = new FormData();
    formData.append('image', file, fileName);
  
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Authorization': getAccessToken(),
      },
      body: formData,
    });
  
    return response
  }

  return {
    getJsonResponse,
    postImage,

    postOne,
    getOne,
    putOne,
    deleteOne,

    // postMany,
    getMany,
    // putMany,
    // deleteMany,
  };
}