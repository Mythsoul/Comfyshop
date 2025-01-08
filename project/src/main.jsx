import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import { Route, Routes } from 'react-router'
import LoginForm from './Pages/Login'
import RegisterForm from './Pages/Register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<App /> } ></Route>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/register' element={<RegisterForm /> }></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
