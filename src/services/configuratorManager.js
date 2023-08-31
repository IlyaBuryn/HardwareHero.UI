import { useFetch } from "../hooks/useFetch";

export const useConfiguratorManager = () => {

  const getComponentTypesRoute = 'gateway/configurator/component-type-signs';

  const client = useFetch();


  const getComponentTypes = async () => {
    try {
      var responseBody = await client.getMany(getComponentTypesRoute, null, null);
      var responseJson = await client.getJsonResponse(responseBody)
      
      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  return {
    getComponentTypes,
  }
}