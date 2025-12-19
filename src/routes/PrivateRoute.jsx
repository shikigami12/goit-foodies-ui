import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUser } from '../redux/slices/authSlice';
import { tokenManager } from '../services';

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const hasToken = tokenManager.hasToken();

  useEffect(() => {
    if (hasToken && !isAuthenticated && !isLoading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, hasToken, isAuthenticated, isLoading]);

  if (hasToken && !isAuthenticated) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
