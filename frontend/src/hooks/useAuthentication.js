// src/hooks/useAuthentication.js
import { useState } from 'react';
import { saveUser, getUser, clearUser } from '../services/userService';

const useAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getUser() !== null);

  const login = (user, setNotification) => {
    saveUser(user);
    setIsLoggedIn(true);
    setNotification({ message: 'Successfully logged in!', type: 'success' });
  };

  const logout = (setNotification) => {
    clearUser();
    setIsLoggedIn(false);
    setNotification({ message: 'Logged out successfully.', type: 'success' });
  };

  return { isLoggedIn, login, logout };
};

export default useAuthentication;
