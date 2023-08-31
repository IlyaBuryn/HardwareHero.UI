import { useApiRoutes } from "../data/apiRoutes";
import { useFetch } from "../hooks/useFetch";
import { ResponseMessage } from "../utils/responseMessage";
import { useUserManager } from "./userManager";

export const useContributorManager = () => {

  const userManager = useUserManager();
  const client = useFetch();
  const api = useApiRoutes();


  const createContributor = async (region, companyName, companyUrl, logoName, logo) => {
    const data = JSON.stringify({
      userId: userManager.getUserSessionInfo().responseValue.userId,
      region: region,
      contributorExcellence: {
        name: companyName,
        logo: logoName
      }
    });
  
    try {
      var logoResponseBody = await client.postImage(api.contributorRoutes['uploadImage'], logo, logoName);
      if (logoResponseBody.ok) {
        var responseBody = await client.postOne(api.contributorRoutes['createOne'], data, null);
        var responseJson = await client.getJsonResponse(responseBody);
  
        return ResponseMessage(null, 'success', responseJson);
      }
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }


  const getContributorByName = async (name) => {
    try {
      var responseBody = await client.getOne(api.contributorRoutes['getOneByName'] + name, null);
      var responseJson = await client.getJsonResponse(responseBody);
  
      return ResponseMessage(null, 'success', responseJson);
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }


  const acceptContributorRequest = async (contributor) => {
    // TODO: set this method to backend
    try {
      contributor.isConfirmed = true;
      var responseUpdateBody = await client.putOne(api.contributorRoutes['updateOne'], JSON.stringify(contributor), null);
      var responseUpdateJson = await client.getJsonResponse(responseUpdateBody);
  
      if (responseUpdateJson) {
        const message = JSON.stringify({
          messageTitle: 'Contributor',
          messageContent: 'You accepted',
          recipientsEmailAddress: userManager.getUserSessionInfo().responseValue.email,
          senderId: userManager.getUserSessionInfo().responseValue.userId
        });
        var responseEmailBody = await client.postOne(api.contributorRoutes['sendEmail'], message, null);
        var responseEmailJson = await client.getJsonResponse(responseEmailBody);
  
        return ResponseMessage(null, 'success', responseEmailJson)
      }
      
      throw new Error('');
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
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
      var responseBody = await client.getOne(api.contributorRoutes['getOneByUserId'] + userId, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return ResponseMessage(null, 'success', responseJson);
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }
  

  const getAllContributors = async () => {
    try {
      var responseBody = await client.getMany(api.contributorRoutes['getMany'], null, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return ResponseMessage(null, 'success', responseJson);
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }


  const deleteContributor = async (contributorId) => {
    try {
      var responseBody = await client.deleteOne(api.contributorRoutes['deleteOne'] + contributorId, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return ResponseMessage(null, 'success', responseJson);
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
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