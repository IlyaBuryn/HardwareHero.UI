import { getAll, getJsonResponse } from "../utils/clientConnect";

const getComponentTypesRoute = 'gateway/configurator/component-type-signs';

export async function getComponentTypes(handleErrorMessageChange) {

  var responseBody = await getAll(getComponentTypesRoute, handleErrorMessageChange, null, null);

  var responseJson = await getJsonResponse(responseBody, handleErrorMessageChange)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleErrorMessageChange('Response error!');
    return [];
  }
}