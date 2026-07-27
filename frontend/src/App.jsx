import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from "./components/Navbar"  
import { useAuthStore } from './store/useAuthStore'

const App = () => {

  const {authUser,checkAuth}=useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/setting" element={<SettingsPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>

    </div>
  )
}

export default App
