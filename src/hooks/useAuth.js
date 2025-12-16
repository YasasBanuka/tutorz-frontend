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
      // Ensure we pass the full user details provided by the backend
      dispatch(loginSuccess({ 
        user: {
          userId: data.userId,
          email: data.email,
          role: data.role,
          firstName: data.firstName, // Make sure these are captured
          lastName: data.lastName
        }, 
        token: data.token 
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Wrapper for Register
  const register = async (registrationData) => {
    try {
      const data = await registerService(registrationData);
      
      // FIX: Previously we were missing firstName/lastName here
      dispatch(loginSuccess({
        user: { 
          userId: data.userId, 
          email: data.email, 
          role: data.role,
          // We try to get these from the response 'data', 
          // or fallback to the form data 'registrationData' if backend doesn't return them immediately
          firstName: data.firstName || registrationData.firstName,
          lastName: data.lastName || registrationData.lastName
        },
        token: data.token
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
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