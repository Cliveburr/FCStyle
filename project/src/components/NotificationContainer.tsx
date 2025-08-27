import React from 'react';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <NotificationItem key={notification.id}
        {...notification}
        onClose={removeNotification}
        index={index}
        />
      ))}
    </div>
  );
};
