import { getAll, getJsonResponse, getOne } from "../utils/clientConnect";

const getComponentsAsPageByFilterRoute = 'gateway/aggregator/components/';
const getComponentByIdRoute = 'gateway/aggregator/component/';
const getPageCountRoute = 'gateway/aggregator/components/pageCount';

export async function getComponentsAsPageByFilter(handleError, pageNumber, pageSize, filter, searchString) {
  
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
  var responseBody = await getAll(getComponentsAsPageByFilterRoute + pageNumber, handleError, null, 
    additionalHeaders);

  var responseJson = await getJsonResponse(responseBody, handleError)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleError('Response error!');
    return [];
  }
}

export async function getPageCount(handleError, pageSize, filter, searchString) {
  
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
  var responseBody = await getAll(getPageCountRoute, handleError, null, 
    additionalHeaders);

  var responseJson = await getJsonResponse(responseBody, handleError)

  if (responseJson) {
    return responseJson;
  }
  else {
    handleError('Response error!');
    return [];
  }
}

export async function getComponentById(errorHandler, id) {
  var responseBody = await getOne(getComponentByIdRoute + id, errorHandler, null);

  var responseJson = await getJsonResponse(responseBody, errorHandler);

  
  if (responseJson) {
    return responseJson;
  }
  else {
    errorHandler('Response error!');
    return null;
  }
}

export async function getManyComponents(errorHandler, ids) {
  if (!ids || ids.length === 0) {
    return [];
  }
  else {
    const items = [];
    ids.forEach(id => {
      items.push(getComponentById(errorHandler, id));
    });
    return items
  }
}