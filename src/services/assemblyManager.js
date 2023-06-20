import { saveAs } from 'file-saver';
import { getUserFromCookie } from './userManager';
import { postOne, getJsonResponse, getAll } from '../utils/clientConnect';

const postAsseblyToDatabaseRoute = 'gateway/assemblies';
const getAssembliesByUserIdRoute = 'gateway/assemblies/';

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function saveJsonAsembly(errorHandler, assembly) {
  const jsonData = JSON.stringify(assembly, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const fileName = `${guid()}_${getCurrentDate()}_assembly.json`;
  saveAs(blob, fileName);
}

export async function saveAsseblyToDatabase(errorHandler, successHandler, assembly) {
  const itemIds = assembly.map((item) => item.item.id);
  var data = JSON.stringify({
    UserId: getUserFromCookie().userId,
    AssemblyCategory: 'PC',
    ComponentIds: itemIds,
  });

  var responseBody = await postOne(postAsseblyToDatabaseRoute, errorHandler, data, null);

  var responseJson = await getJsonResponse(responseBody, errorHandler);

  if (responseJson) {
    await successHandler('Сборка успешно сохранена!')
  }
}

export async function getAssembliesByUserId(errorHandler) {
  var responseBody = await getAll(getAssembliesByUserIdRoute + getUserFromCookie().userId, errorHandler, null, null);

  var responseJson = await getJsonResponse(responseBody, errorHandler);

  if (!responseBody.ok) {
    errorHandler('У вас нет ни одной сборки!')
  }
  else if (responseJson) {
    return responseJson;
  }
}