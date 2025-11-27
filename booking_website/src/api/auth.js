// src/api/auth.js
import axios from 'axios';
import LOGIN_URL from './config';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${LOGIN_URL}`, { username, password });
    return response.data; // assuming the backend returns the user details or token
  } catch (error) {
    // from here I have to return the status code and data
    // if(error.response == 401) return error;
    throw new Error('Login failed: ' + error.message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};


