import { useApiRoutes } from "../data/apiRoutes";
import { useFetch } from "../hooks/useFetch";

export const useAggregatorManager = () => {

  const client = useFetch();
  const api = useApiRoutes();

  const getComponentsAsPageByFilter = async (pageNumber, pageSize, filter, searchString) => {

    // TODO: Remove this crap
    if (!filter) {
      filter = '{}';
    }

    // TODO: Need add validation hook
    if (!searchString) {
      searchString = " ";
    }

    const additionalHeaders = {
      'X-Specification-Filter': filter,
      'X-Search-String': searchString,
      'X-Page-Size': pageSize,
    }

    try {
      var responseBody = await client.getMany(api.aggregatorRoutes['getManyAsPage'] + pageNumber, null, additionalHeaders);
      var responseJson = await client.getJsonResponse(responseBody)

      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  // TODO: getComponentsAsPageByFilter shoud return page count !!!
  const getPageCount = async (pageSize, filter, searchString) => {
    
    if (false) {
      return 1;
    }
      if (!filter) {
      filter = '{}';
    }

    if (!searchString) {
      searchString = " ";
    }

    const additionalHeaders = {
      'X-Specification-Filter': filter,
      'X-Search-String': searchString,
      'X-Page-Size': pageSize,
    }
    try {
    var responseBody = await client.getMany(api.aggregatorRoutes['getPageCount'], null, additionalHeaders);
    var responseJson = await client.getJsonResponse(responseBody, handleError)

    return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  const getComponentById = async (componentId) => {
    try {
      var responseBody = await client.getOne(api.aggregatorRoutes['getOneById'] + componentId, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  const getManyComponents = async (ids) => {
    if (!ids || ids.length === 0) {
      return [];
    }
    else {
      const items = [];
      ids.forEach(async id => { // TODO: To backend
        const item = await getComponentById(id);
        items.push(item); // TODO: should be check for item.responseValue or smth
      });
      return items
    }
  }

  return {
    getComponentsAsPageByFilter,
    getPageCount,
    getComponentById,
    getManyComponents
  }
}