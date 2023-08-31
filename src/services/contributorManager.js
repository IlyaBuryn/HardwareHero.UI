import { useFetch } from "../hooks/useFetch";
import { useUserManager } from "./userManager";

export const useContributorManager = () => {
  
  // TODO: Move routes to /data directory
  const createContributorRoute = 'gateway/contributor';
  const getContributorByUserIdRoute = 'gateway/contributor/by-user/';
  const deleteContributorRoute = 'gateway/contributor/';
  const uploadImageRoute = 'gateway/contributor/upload-image';
  const getAllContributorsRoute = 'gateway/contributor';
  const updateContributorRoute = 'gateway/contributor';
  const getContributrByNameRoute = 'gateway/contributor/';
  const sendEmailMessageRoute = 'gateway/mail/send';

  const userManager = useUserManager();
  const client = useFetch();


  const createContributor = async (region, companyName, companyUrl, logoName, logo) => {
    const data = JSON.stringify({
      userId: userManager.getUserSessionInfo().userId,
      region: region,
      contributorExcellence: {
        name: companyName,
        logo: logoName
      }
    });
  
    try {
      var logoResponseBody = await client.postImage(uploadImageRoute, logo, logoName);
      if (logoResponseBody.ok) {
        var responseBody = await client.postOne(createContributorRoute, data, null);
        var responseJson = await client.getJsonResponse(responseBody);
  
        return responseJson;
        // TODO: I can return value from responseJson in object as: {'message': ex.message, 'type': 'error', 'responseValue': responseJson ?? null}
      }
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }


  const getContributorByName = async (name) => {
    try {
      var responseBody = await client.getOne(getContributrByNameRoute + name, null);
      var responseJson = await client.getJsonResponse(responseBody);
  
      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }


  const acceptContributorRequest = async (contributor) => {
    // TODO: set method at backend
    try {
      contributor.isConfirmed = true;
      var responseUpdateBody = await client.putOne(updateContributorRoute, JSON.stringify(contributor), null);
      var responseUpdateJson = await client.getJsonResponse(responseUpdateBody);
  
      if (responseUpdateJson) {
        const message = JSON.stringify({
          messageTitle: 'Contributor',
          messageContent: 'You accepted',
          recipientsEmailAddress: userManager.getUserSessionInfo().email,
          senderId: userManager.getUserSessionInfo().userId
        });
        var responseEmailBody = await client.postOne(sendEmailMessageRoute, message, null);
        var responseEmailJson = await client.getJsonResponse(responseEmailBody);
  
        return responseEmailJson;
      }
      
      return null;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }


  const deniedContributorRequest = async (contributor) => {

  }
  
  const createChatWithContributor = async (contributorId) => {
  
  }
  
  const getChat = async (contributorId, cooperatorId) => {
  
  }
  
  const sendMessage = async (senderId, recipientId) => {
  
  }


  const getContributorByUserId = async (userId) => {
    try {
      var responseBody = await client.getOne(getContributorByUserIdRoute + userId, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }
  

  const getAllContributors = async () => {
    try {
      var responseBody = await client.getMany(getAllContributorsRoute, null, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }


  const deleteContributor = async (contributorId) => {
    try {
      var responseBody = await client.deleteOne(deleteContributorRoute + contributorId, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }


  return {
    createContributor,
    getContributorByName,
    acceptContributorRequest,
    getContributorByUserId,
    getAllContributors,
    deleteContributor,

    deniedContributorRequest,
    createChatWithContributor,
    getChat,
    sendMessage,

  }
}