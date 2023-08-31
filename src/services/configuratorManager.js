import { useApiRoutes } from "../data/apiRoutes";
import { useFetch } from "../hooks/useFetch";

export const useConfiguratorManager = () => {

  const client = useFetch();
  const api = useApiRoutes();


  const getComponentTypes = async () => {
    try {
      var responseBody = await client.getMany(api.configuratorRoutes['getTypes'], null, null);
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