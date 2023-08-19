import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTranslation } from 'react-i18next';
import './AlertQueue.css';

export const AlertQueue = () => {
  const [queue, setQueue] = useState([]);
  const { t, i18n } = useTranslation();
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
    const handleEnqueueAlert = (event) => {
      const { message, type } = event.detail;
      enqueueAlert(message, type);
    };

    const alertQueue = document.getElementById('alert-queue-root');
    alertQueue.addEventListener('enqueue-alert', handleEnqueueAlert);

    return () => {
      alertQueue.removeEventListener('enqueue-alert', handleEnqueueAlert);
    };
  }, []);

  const enqueueAlert = (message, type) => {
    console.log('show message: ' + message + '; ' + type)
    setQueue((prevQueue) => [
      ...prevQueue,
      { message, type, id: Date.now(), hidden: false },
    ]);
  };

  const hideAlert = (id) => {
    setQueue((prevQueue) =>
      prevQueue.map((item) => (item.id === id ? { ...item, hidden: true } : item))
    );
  };

  return (
    <div className="alert-container">
      <div className="alert-controls">
        {queue.length > 0 && (
          <div
            className="alert-control"
            onClick={() => setQueue([])}
          >
            <DeleteOutlineIcon />
          </div>
        )}
        {remainingMessagesCount > 0 && (
          <div className="alert-count">
            {remainingMessagesCount}
          </div>
        )}
      </div>
      {queue.slice(0, 3).map((item) => (
        !item.hidden && (
          <Alert sx={{ borderRadius: 4, borderColor: (item.type == 'success' ? '#4caf50' : '#e5350')}}
            
            key={item.id}
            className="alert-message"
            severity={item.type}
            onClose={() => {
              hideAlert(item.id);
              setQueue((prevQueue) =>
                prevQueue.filter((queueItem) => queueItem.id !== item.id)
              );
            }}
          >
            <AlertTitle>
              <strong>{item.type === 'error' ? t("Alert.Error") : t("Alert.Success")}</strong>
            </AlertTitle>
            {item.message}
          </Alert>
        )
      ))}
    </div>
  );
};

export const useAlertQueue = () => {
  const enqueueAlert = (message, type) => {
    const alertQueue = document.getElementById('alert-queue-root');
    if (alertQueue) {
      const newEvent = new CustomEvent('enqueue-alert', {
        detail: { message, type },
      });
      alertQueue.dispatchEvent(newEvent);
    }
  };

  return enqueueAlert;
};
