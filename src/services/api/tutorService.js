import apiClient from './apiClient';

export const getClasses = async () => {
  const response = await apiClient.get('/tutor/classes');
  return response.data;
};

export const createClass = async (data) => {
  const response = await apiClient.post('/tutor/classes', data);
  return response.data;
};

export const updateClass = async (id, data) => {
  const response = await apiClient.put(`/tutor/classes/${id}`, data);
  return response.data;
};

export const addStudentToClass = async (data) => {
  const response = await apiClient.post('/tutor/classes/add-student', data);
  return response.data;
};