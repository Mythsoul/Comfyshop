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
import AuthProvider from './components/AuthProvider'
import Layout from './components/Layout'
import { ToastProvider } from '@radix-ui/react-toast'; // Import ToastProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <ToastProvider> {/* Wrap with ToastProvider */}
          <Layout>
            <AuthProvider>
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
              </Routes>
            </AuthProvider>
          </Layout>
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
