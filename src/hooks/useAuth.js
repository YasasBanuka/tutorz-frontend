import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/authSlice';
import { login as loginService, register as registerService } from '../services/auth/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  // Wrapper for Login
  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Wrapper for Register
  const register = async (registrationData) => {
    try {
      const data = await registerService(registrationData);
      // Automatically log the user in after registration
      dispatch(loginSuccess({
        user: { userId: data.userId, email: data.email, role: data.role },
        token: data.token
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Wrapper for Logout
  const logoutUser = () => {
    dispatch(logout());
    // You might also want to clear local storage here if you use it
    // localStorage.removeItem('token');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout: logoutUser,
  };
};

export default useAuth;