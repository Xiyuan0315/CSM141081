import React from 'react';
import { useNotification } from './NotificationContext';

const Notification = () => {
  const { notification } = useNotification();
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? 'block' : 'none'
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

export default Notification;
