import React, { useState, createContext, useContext } from 'react';
import './Alert.css';

// Tạo context
const AlertContext = createContext();

// Provider cho toàn ứng dụng
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'success') => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={addAlert}>
      {children}
      <div className="alert-container">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

// Hook để sử dụng alert
export const useAlert = () => useContext(AlertContext);
