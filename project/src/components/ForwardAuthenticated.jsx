import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { login } from '@/store/Authslice'
const ForwardAuthenticated = ({ children }) => {
axios.defaults.withCredentials = true;
const dispatch = useDispatch(); 
  useEffect(()=>{ 
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_CHECK_AUTH_URL);
        if (response.status === 200 && response.data) { 
          dispatch(login(response.data));
        }
      } catch (error) {
        console.error('Failed to check auth status', error);
      } 
    } 

    checkAuthStatus()
  }, [])
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, loading, navigate])
  if (loading) {
    return <div>Loading...</div>
  }

  return !loading && !isAuthenticated ? children : null
}

export default ForwardAuthenticated