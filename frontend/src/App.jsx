import React from 'react'
import { Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<SignUpPage />} />
        <Route path="/" element={<LogInPage />} />
        <Route path="/" element={<SettingsPage />} />
        <Route path="/" element={<ProfilePage />} />
      </Routes>

    </div>
  )
}

export default App
