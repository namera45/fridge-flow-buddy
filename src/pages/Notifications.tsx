
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import AppLayout from '@/components/layout/AppLayout';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Notifications = () => {
  const { notifications, markNotificationAsRead } = useFridgely();
  
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    
    switch (type) {
      case 'expiry':
        return 'bg-fridgely-orange/10';
      case 'recipe':
        return 'bg-fridgely-green/10';
      case 'system':
        return 'bg-fridgely-blue/10';
      default:
        return 'bg-white';
    }
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'expiry':
        return '⚠️';
      case 'recipe':
        return '🍳';
      case 'system':
        return 'ℹ️';
      default:
        return '📝';
    }
  };
  
  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-500">
            {notifications.filter(n => !n.read).length} unread
          </p>
        </div>
        
        <div className="space-y-3">
          {sortedNotifications.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No notifications</p>
              <p className="text-gray-400 text-sm">We'll notify you about expiring items and more</p>
            </div>
          ) : (
            sortedNotifications.map(notification => (
              <div
                key={notification.id}
                className={cn(
                  "border border-gray-100 rounded-xl p-4 shadow-sm transition-all",
                  getBgColor(notification.type, notification.read),
                  !notification.read && "border-l-4",
                  notification.type === 'expiry' && !notification.read && "border-l-fridgely-orange",
                  notification.type === 'recipe' && !notification.read && "border-l-fridgely-green",
                  notification.type === 'system' && !notification.read && "border-l-fridgely-blue",
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="text-2xl">{getIconForType(notification.type)}</div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium",
                      !notification.read && "font-semibold"
                    )}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {format(new Date(notification.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
