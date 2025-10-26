// FIX: The import path is changed from './apiClient' to '../api/apiClient'
import apiClient from '../api/apiClient';
import { store } from '../../store'; // Make sure this path is correct

/**
 * Calls the backend API to register a new user.
 * @param {object} registrationData - The complete data object from the multi-step form.
 * @returns {Promise<object>} The AuthResponse object from the backend.
 */
export const register = async (registrationData) => {
  try {
    // This sends a POST request to 'https://localhost:7010/api/auth/register'
    // The body (registrationData) must match your RegisterRequest.cs DTO
    
    // We no longer pass { email, password, role }
    // We pass the whole object directly
    const response = await apiClient.post('/auth/register', registrationData);
    
    // response.data will be the AuthResponse object from your C# backend
    // { userId, email, role, token }
    return response.data;

  } catch (err) {
    // If the API returns an error, throw it
    throw new Error(err.response?.data?.message || 'Registration failed. Please try again.');
  }
};

/**
 * Calls the backend API to log in a user.
 * (You will need this for your LoginForm)
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The AuthResponse object from the backend.
 */
export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed. Please try again.');
    }
};
