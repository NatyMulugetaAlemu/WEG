import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  })
  const {signup,isSigningUp}=useAuthStore()

  const validateForm=()=>{

  }

   const handleSubmit=(e)=>{
    event.preventDefault()
   }

  return (
    <div></div>
  )
}

export default SignUpPage