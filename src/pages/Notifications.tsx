import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { Bell, Check, Trash2, Mail, User, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Payment Received', message: 'Payment of $1,200 has been received from Acme Corp', time: '5 minutes ago', read: false },
  { id: '2', type: 'info', title: 'New User Registration', message: 'John Doe has registered as a new user', time: '15 minutes ago', read: false },
  { id: '3', type: 'warning', title: 'Server Maintenance', message: 'Scheduled maintenance will occur tonight at 2 AM', time: '1 hour ago', read: true },
  { id: '4', type: 'error', title: 'Failed Login Attempt', message: 'Multiple failed login attempts detected from IP 192.168.1.1', time: '2 hours ago', read: true },
  { id: '5', type: 'info', title: 'New Comment', message: 'Alice Brown commented on your project "Website Redesign"', time: '3 hours ago', read: true },
  { id: '6', type: 'success', title: 'Task Completed', message: 'Database migration has been completed successfully', time: '5 hours ago', read: true },
  { id: '7', type: 'info', title: 'Meeting Reminder', message: 'Team meeting scheduled for tomorrow at 10 AM', time: '1 day ago', read: true },
];

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {notifications.filter((n) => !n.read).length} unread notifications
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <Mail size={18} className="mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAll}>
            <Trash2 size={18} className="mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'primary' : 'outline'}
          onClick={() => setFilter('unread')}
          size="sm"
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </Button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
              <p className="text-gray-600 dark:text-gray-400">You're all caught up!</p>
            </div>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{notification.time}</p>
                      </div>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                            aria-label="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
