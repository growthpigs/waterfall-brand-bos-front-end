import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Brain, TrendingUp, AlertCircle } from 'lucide-react';
interface Notification {
  id: string;
  type: 'intelligence' | 'performance' | 'alert';
  title: string;
  message: string;
  time: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  color: string;
}
const notifications: Notification[] = [
  {
    id: '1',
    type: 'intelligence',
    title: 'Brand Intelligence Alert',
    message: 'New competitor analysis available',
    time: '2m ago',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: '2',
    type: 'performance',
    title: 'Performance Update',
    message: 'Campaign ROI increased by 45%',
    time: '5m ago',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Action Required',
    message: 'Content approval needed',
    time: '10m ago',
    icon: AlertCircle,
    color: 'from-orange-500 to-red-500',
  },
];
const NotificationBubbles: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);
  const toggleNotifications = () => setIsOpen(!isOpen);
  const dismissNotification = (id: string) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id));
  };
  const unreadCount = notificationList.length;
  return (
    <div className="relative">
      {/* Notification Button */}
      <motion.button
        onClick={toggleNotifications}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="relative w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border border-slate-200"
      >
        <Bell className="w-5 h-5 text-slate-600" />
        {unreadCount > 0 && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: -10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <button
                  onClick={toggleNotifications}
                  className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notificationList.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No new notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notificationList.map(notification => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -20,
                        }}
                        className="p-4 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${notification.color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-slate-900 truncate">
                                {notification.title}
                              </h4>
                              <button
                                onClick={() => dismissNotification(notification.id)}
                                className="opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center hover:bg-slate-200 rounded-full transition-all"
                              >
                                <X className="w-3 h-3 text-slate-500" />
                              </button>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notificationList.length > 0 && (
              <div className="p-3 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setNotificationList([])}
                  className="w-full text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default NotificationBubbles;
