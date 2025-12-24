/**
 * Extracts a readable error message from an Axios error object.
 */
export const extractErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  return error.message || 'An unexpected error occurred.';
};

/**
 * Formats a date string to a readable format (e.g., DD MMM YYYY).
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Formats currency (e.g., LKR 1,000.00).
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
};

/**
 * Shows a confirmation dialog and returns user's choice
 * @param {string} message - The confirmation message to display
 * @returns {boolean} - true if user clicks OK, false if Cancel
 */
export const confirmAction = (message = "Are you sure you want to proceed?") => {
  return window.confirm(message);
};