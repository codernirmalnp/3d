import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './com/Dashboard'
import MainPage from './MainPage'
import Tag from './com/Dashboard/tag'
import Project from './com/Dashboard/Project'
import Login from './com/Login'
import PrivateRoutes from './com/Dashboard/Protected';
import Certificate from './com/Dashboard/Certificate'
import CreateProject from './com/Dashboard/CreateProject'
import EditProject from './com/Dashboard/EditProject'










function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />} >
          <Route element={<Dashboard />} exact>
            <Route path="/dashboard" element={<Certificate />} />
            <Route path="/tag" element={<Tag />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/add" element={<CreateProject />} />
            <Route path="/project/edit/:id" element={<EditProject />} />
            <Route path="/" element={<>Tag</>} />
          </Route>
        </Route>


      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />



    </BrowserRouter>

  )
}

export default App
