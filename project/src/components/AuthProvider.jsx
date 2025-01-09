import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login,setLoading } from '@/store/Authslice'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(import.meta.env.VITE_CHECK_AUTH_API_URL);
        if (response.status === 200 && response.data === true) {
          dispatch(login());
        }
      } catch (error) {
        console.error('Failed to check auth status', error);
      } finally {
        dispatch(setLoading(false));
      }
    }

    checkAuthStatus()
  }, [dispatch])

  return (
    <>
      {children}
    </>
  )
}

export default AuthProvider
