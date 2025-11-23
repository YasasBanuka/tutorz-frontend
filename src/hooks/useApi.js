import { useState, useCallback } from 'react';
import { extractErrorMessage } from '../utils/helpers';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * @param {Function} apiFunc - The async service function to call (e.g., instituteService.getAll)
   * @param  {...any} args - Arguments for the service function
   */
  const request = useCallback(async (apiFunc, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return { data: result, error: null };
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message);
      return { data: null, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, data, request, setError };
};

export default useApi;