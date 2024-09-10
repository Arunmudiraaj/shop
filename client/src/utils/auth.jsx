// src/utils/auth.js
export const getToken = () => {
    return localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  };
  
  export const setToken = (token) => {
    localStorage.setItem('auth', JSON.stringify(token));
  };
  
  export const removeToken = () => {
    localStorage.removeItem('auth');
  };
  