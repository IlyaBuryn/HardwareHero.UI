import { saveAs } from 'file-saver';
import { useUserManager } from './userManager';
import { useFetch } from '../hooks/useFetch';
import { useApiRoutes } from '../data/apiRoutes';

export const useAssemblyManager = () => {

  const client = useFetch();
  const userManager = useUserManager();
  const api = useApiRoutes();

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

  const saveJsonAsembly = (assembly) => {
    const jsonData = JSON.stringify(assembly, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const fileName = `${guid()}_${getCurrentDate()}_assembly.json`;
    saveAs(blob, fileName);
  }

  const saveAsseblyToDatabase = async (assembly) => {
    try {
      const itemIds = assembly.map((item) => item.item.id);
      var data = JSON.stringify({
        UserId: userManager.getUserSessionInfo().userId,
        AssemblyCategory: 'PC',
        ComponentIds: itemIds,
      });

      var responseBody = await client.postOne(api.assemblyRoutes['createOne'], data, null);
      var responseJson = await client.getJsonResponse(responseBody);

      return responseJson; // TODO: it also should return success message (was: successHandler)
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }

  }

  const getAssembliesByUserId = async () => {
    try {
      var responseBody = await client.getMany(api.assemblyRoutes['getOneByUserId'] + userManager
        .getUserSessionInfo().userId, null, null);
      var responseJson = await client.getJsonResponse(responseBody);
        
      return responseJson;
    }
    catch (ex) {
      return {'message': ex.message, 'type': 'error'};
    }
  }

  return {
    saveJsonAsembly,
    saveAsseblyToDatabase,
    getAssembliesByUserId
  };
}