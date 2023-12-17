import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification) {
    return null;
  }

  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: notification.type === 'error' ? 'red' : 'green'
  };

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  );
};

export default Notification;
