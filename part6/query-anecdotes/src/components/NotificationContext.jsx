// components/NotificationContext.js
import React, { createContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
