import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../assets/styles/signup.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Full name is required");

    if (!formData.email.trim())
      return toast.error("Email is required");

    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password)
      return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="signup-page">

      {/* Left Side */}

      <div className="signup-left">
        <div className="logo-section">
          <h2>WEG</h2>
          <div className="logo-icon">
            <MessageSquare size={52} />
          </div>
        </div>
      </div>


      <div className="divider"></div>

      {/* Right Side */}



      <div className="signup-right">
        <div className="content-section">

          <h1>Create Account</h1>

          <p>Get started with your free account</p>

        </div>

        <form onSubmit={handleSubmit}>



          <div className="input-1">
            <label>Full Name</label>

            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="Enter your name"
              />
            </div>
          </div>

        </form>
      </div>

    </div>
  );
};

export default SignUpPage;