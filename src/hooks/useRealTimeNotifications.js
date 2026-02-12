import { useState, useEffect } from 'react';

const useRealTimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate real-time notifications using setInterval
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'info',
        title: 'Real-time Alert',
        message: `Asthma risk update at ${new Date().toLocaleTimeString()}`,
        time: new Date().toLocaleTimeString(),
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

export default useRealTimeNotifications;
