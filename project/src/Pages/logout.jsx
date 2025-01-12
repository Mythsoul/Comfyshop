import { Toast } from '@/components/ui/toast';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import { logout as userlogout } from '@/store/Authslice';
function Logout() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    useEffect(() => { 
        const logout = async () => { 
            try { 
                const response = await axios.get(import.meta.env.VITE_LOGOUT_URL);
                if (response.status === 200) {
                    dispatch(userlogout()); 
                    navigate('/login'); // Navigate to login page after logout
                    Toast({
                        title: "Logged out",
                        description: "You have been logged out",
                        variant: "default",
                        duration: 3000
                    });
                    console.log('Logged out');
                } else {
                    console.error('Failed to logout', response);
                }
            } catch (error) {
                console.error('Failed to logout', error);
            }
        };
        logout();
    }, [dispatch, navigate]);
    return <div>Logging out...</div>; // Ensure the component returns some JSX
}

export default Logout