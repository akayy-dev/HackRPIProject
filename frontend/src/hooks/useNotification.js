// src/hooks/useNotification.js
import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const closeNotification = () => setNotification({ message: '', type: '' });

  return { notification, setNotification, closeNotification };
};

export default useNotification;
