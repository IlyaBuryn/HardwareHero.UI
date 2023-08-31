import { useApiRoutes } from "../data/apiRoutes";
import { useFetch } from "../hooks/useFetch";
import { ResponseMessage } from "../utils/responseMessage";

export const useConfiguratorManager = () => {

  const client = useFetch();
  const api = useApiRoutes();


  const getComponentTypes = async () => {
    try {
      var responseBody = await client.getMany(api.configuratorRoutes['getTypes'], null, null);
      var responseJson = await client.getJsonResponse(responseBody)
      
      return ResponseMessage(null, 'success', responseJson);
    }
    catch (ex) {
      return ResponseMessage(ex.message, 'error');
    }
  }

  return {
    getComponentTypes,
  }
}