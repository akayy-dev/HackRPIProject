// src/services/userService.js

export const getUserData = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const setUserData = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
  };
  
  export const clearUserData = () => {
    sessionStorage.removeItem('user');
  };
  