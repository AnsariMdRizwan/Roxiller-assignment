import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './components/adminDashboard'
import StoreOwnerDashboard from './components/storeOwner'
import { ToastContainer } from 'react-toastify'
import ChangePassword from './components/changepassword'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/store' element={<StoreOwnerDashboard />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        autoClose={2000}
      />
    </>
  )
}

export default App
