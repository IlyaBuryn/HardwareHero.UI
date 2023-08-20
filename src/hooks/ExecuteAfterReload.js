import { useEffect } from 'react';
import { useSnackbarQueue } from '../components/Common/Snackbar/SnackbarQueue';


const useExecuteAfterReload = (callback) => {

  const enqueueSnackbar = useSnackbarQueue();

  useEffect(() => {
    const shouldExecuteMessage = localStorage.getItem('snackbarMessage');
    const shouldExecuteType = localStorage.getItem('snackbarMessageType');

    if (shouldExecuteMessage && shouldExecuteType) {
      enqueueSnackbar(shouldExecuteMessage, shouldExecuteType)
      localStorage.removeItem('snackbarMessage');
      localStorage.removeItem('snackbarMessageType');
    }
  }, []);
}


export default useExecuteAfterReload;