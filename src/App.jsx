import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './com/Dashboard'
const MainPage=React.lazy(()=>import('./MainPage'))





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<>Login</>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>



    </BrowserRouter>
  )
}

export default App
