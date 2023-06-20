import { postOne, getJsonResponse, getOne, deleteOne, uploadImage, getAll, putOne } from "../utils/clientConnect";
import { getUserFromCookie } from "./userManager";

const createContributorRoute = 'gateway/contributor';
const getContributorByUserIdRoute = 'gateway/contributor/by-user/';
const deleteContributorRoute = 'gateway/contributor/';
const uploadImageRoute = 'gateway/contributor/upload-image';
const getAllContributorsRoute = 'gateway/contributor';
const updateContributorRoute = 'gateway/contributor';
const getContributrByNameRoute = 'gateway/contributor/';
const sendEmailMessageRoute = 'gateway/mail/send';

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

export async function getContributorByName(errorHandler, name) {
  try {
    var responseBody = await getOne(getContributrByNameRoute + name, errorHandler, null);
    var responseJson = await getJsonResponse(responseBody, errorHandler);

    if (responseJson && responseBody.ok) {
      return responseJson;
    }
    else {
      return null;
    }
  }
  catch (ex) {
    errorHandler('Response error!');
    return null;
  }
}

export async function acceptContributorRequest(errorHandler, contributor) {
  try {

    contributor.isConfirmed = true;
    console.log(contributor);
    var responseUpdateBody = await putOne(updateContributorRoute, errorHandler, JSON.stringify(contributor), null);
    var responseUpdateJson = await getJsonResponse(responseUpdateBody, errorHandler);

    if (responseUpdateBody.ok && responseUpdateJson) {
      const message = JSON.stringify({
        messageTitle: 'Contributor',
        messageContent: 'You accepted',
        recipientsEmailAddress: getUserFromCookie().email,
        senderId: getUserFromCookie().userId
      });
      var responseEmailBody = await postOne(sendEmailMessageRoute, errorHandler, message, null);
      var responseEmailJson = await getJsonResponse(responseEmailBody, errorHandler);

      if (!responseEmailBody.ok) {
        errorHandler('Не удалось отправить сообщение на почту по причине ошибки в запросе отправления email сообщений');
        return null;
      }
      else {
        return responseEmailJson;
      }
    }
    else {
      errorHandler('Не удалось отправить сообщение на почту по причине ошибки в запросе обновления');
      return null;
    }
  }
  catch (ex) {
    errorHandler('Response error!');
    return null;
  }
}

export async function deniedContributorRequest(errorHandler, contributor) {

}

export async function createChatWithContributor(errorHandler, contributorId) {

}

export async function getChat(errorHandler, contributorId, cooperatorId) {

}

export async function sendMessage(errorHandler, senderId, recipientId) {

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
    localStorage.setItem('errorMessage', 'Response error!');
    return null
  }

  if (responseJson && responseBody.ok) {
    return responseJson;
  }
  else {
    localStorage.setItem('errorMessage', 'Response error!');
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