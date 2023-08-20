import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';

import './SnackbarQueue.css';


export const SnackbarQueue = () => {
  
  const [queue, setQueue] = useState([]);
  const { t } = useTranslation();
  const remainingMessagesCount = queue.length - 3;

  useEffect(() => {
    if (queue.length > 0) {
      const timer = setTimeout(() => {
        setQueue((prevQueue) => prevQueue.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [queue]);

  useEffect(() => {
    const handleEnqueueSnackbar = (event) => {
      const { message, type } = event.detail;
      enqueueSnackbar(message, type);
    };

    const snackbarQueue = document.getElementById('snackbar-queue-root');
    snackbarQueue.addEventListener('enqueue-snackbar', handleEnqueueSnackbar);

    return () => {
      snackbarQueue.removeEventListener('enqueue-snackbar', handleEnqueueSnackbar);
    };
  }, []);

  const enqueueSnackbar = (message, type) => {
    console.log('show message: ' + message + '; ' + type)
    setQueue((prevQueue) => [
      ...prevQueue,
      { message, type, id: Date.now(), hidden: false },
    ]);
  };

  const hideSnackbar = (id) => {
    setQueue((prevQueue) =>
      prevQueue.map((item) => (item.id === id ? { ...item, hidden: true } : item))
    );
  };

  return (
    <div className="snackbar-container">
      <div className="snackbar-controls">
        {queue.length > 0 && (
          <div
            className="snackbar-control"
            onClick={() => setQueue([])}
          >
            <DeleteOutlineIcon />
          </div>
        )}
        {remainingMessagesCount > 0 && (
          <div className="snackbar-count">
            {remainingMessagesCount}
          </div>
        )}
      </div>
      {queue.slice(0, 3).map((item) => (
        !item.hidden && (
          <Alert sx={{ borderRadius: 4, borderColor: (
            item.type === 'success' ? '#4caf50' : 
            item.type === 'error' ? '#e5350' : 
            item.type === 'warning' ? '#ff9800' :
            '#03a9f4')}}
            
            key={item.id}
            className="snackbar-message"
            severity={item.type}
            onClose={() => {
              hideSnackbar(item.id);
              setQueue((prevQueue) =>
                prevQueue.filter((queueItem) => queueItem.id !== item.id)
              );
            }}
          >
            <AlertTitle>
              <strong>{
                item.type === 'error' ? t("Alert.Error") : 
                item.type === 'success' ? t("Alert.Success") : 
                item.type === 'warning' ? t("Alert.Warning") : 
                t("Alert.Info")}</strong>
            </AlertTitle>
            {item.message}
          </Alert>
        )
      ))}
    </div>
  );
};

export const useSnackbarQueue = () => {
  const enqueueSnackbar = (message, type) => {
    const snackbarQueue = document.getElementById('snackbar-queue-root');
    if (snackbarQueue) {
      const newEvent = new CustomEvent('enqueue-snackbar', {
        detail: { message, type },
      });
      snackbarQueue.dispatchEvent(newEvent);
    }
  };

  return enqueueSnackbar;
};

export const useSnackbarBeforeReload = () => {
  const enqueueSnackbarReload = (message, type) => {
    localStorage.setItem('snackbarMessage', message);
    localStorage.setItem('snackbarMessageType', type);
  };

  return enqueueSnackbarReload;
}