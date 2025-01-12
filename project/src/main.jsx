import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import { Route, Routes } from 'react-router'
import LoginForm from './Pages/Login'
import RegisterForm from './Pages/Register'
import { Provider } from 'react-redux'
import Store from './store/store'
import ForwardAuthenticated from './components/ForwardAuthenticated'
import Layout from './components/Layout'
import { ToastProvider } from '@radix-ui/react-toast'; // Import ToastProvider
import Additems from './Pages/Additems'
import EnsureAuthenticated from './components/EnsureAuthenticated'
import Logout from './Pages/logout'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <ToastProvider> 
          <Layout>
        
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={
                  <ForwardAuthenticated>
                    <LoginForm />
                  </ForwardAuthenticated>
                } />
                <Route path='/register' element={
                  <ForwardAuthenticated>
                    <RegisterForm />
                  </ForwardAuthenticated>
                } />
                <Route path='/additems' element={<EnsureAuthenticated> <Additems /> </EnsureAuthenticated>} />
                <Route path = '/logout' element={<EnsureAuthenticated> <Logout /> </EnsureAuthenticated>} />
                <Route path='*' element={<h1>404 Not Found</h1>} />
              </Routes>
          </Layout>
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
