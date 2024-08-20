import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './com/Dashboard/AuthContext.jsx'
import MainPage from './MainPage.jsx'
import { BrowserRouter } from 'react-router-dom'




ReactDOM.createRoot(document.getElementById('root')).render(


  <UserProvider>
    <App />
  </UserProvider>



)
