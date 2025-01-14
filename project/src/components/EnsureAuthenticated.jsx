import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { login, setLoading } from '@/store/Authslice';


axios.defaults.withCredentials = true;

const EnsureAuthenticated = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(import.meta.env.VITE_CHECK_AUTH_URL);
        if (response.status === 200 && response.data.authenticated) {
          dispatch(login(response.data.user));
        }
      } catch (error) {
        console.error('Failed to check auth status', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default EnsureAuthenticated;