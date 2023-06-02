import { postOne, getJsonResponse, getOne, deleteOne, uploadImage, getAll } from "../utils/clientConnect";
import { getUserFromCookie } from "./userManager";

const createContributorRoute = 'gateway/contributor';
const getContributorByUserIdRoute = 'gateway/contributor/by-user/';
const deleteContributorRoute = 'gateway/contributor/';
const uploadImageRoute = 'gateway/contributor/upload-image';
const getAllContributorsRoute = 'gateway/contributor';

export async function createContributor(errorHandler, region, companyName, companyUrl, logoName, logo) {
  const data = JSON.stringify({
    userId: getUserFromCookie().userId,
    region: region,
    contributorExcellence: {
      name: companyName,
      logo: logoName
    }
  });

  try {
    var logoResponseBody = await uploadImage(uploadImageRoute, errorHandler, logo, logoName);

    if (logoResponseBody.ok) {
      var responseBody = await postOne(createContributorRoute, errorHandler, data, null);
      var responseJson = await getJsonResponse(responseBody, errorHandler);

      if (responseJson && responseBody.ok) {
        return responseJson;
      }
    }
  }
  catch (ex) {
    console.error('Ошибка при выполнении запроса: ', ex);
    errorHandler('Response error!');
    return null;
  }
}

export async function getContributorByUserId(errorHandler, userId) {
  try {
    var responseBody = await getOne(getContributorByUserIdRoute + userId, errorHandler, null);
    var responseJson = await getJsonResponse(responseBody, errorHandler);
  }
  catch (ex) {
    errorHandler('Response error!');
    return null;
  }

  if (responseJson && responseBody.ok) {
    return responseJson;
  }
  else {
    return null;
  }
}


export async function getAllContributors(errorHandler) {
  try {
    var responseBody = await getAll(getAllContributorsRoute, errorHandler, null, null);
    var responseJson = await getJsonResponse(responseBody, errorHandler);
  }
  catch (ex) {
    localStorage.setItem('ErrorMessage', 'Response error!');
    return null
  }

  if (responseJson && responseBody.ok) {
    return responseJson;
  }
  else {
    localStorage.setItem('ErrorMessage', 'Response error!');
    return null;
  }
}


export async function deleteContributor(errorHandler, contributorId) {
  try {
    var responseBody = await deleteOne(deleteContributorRoute + contributorId, errorHandler, null);
    var responseJson = await getJsonResponse(responseBody, errorHandler);
  }
  catch (ex) {
    errorHandler('Response error!');
    return null
  }

  if (responseJson && responseBody.ok) {
    return responseJson;
  }
  else {
    errorHandler('Response error!');
    return null;
  }
}