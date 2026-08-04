



import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (

    <div className="min-h-screen mt-12 grid lg:grid-cols-[1fr_auto_1fr]">

      {/* Left Side */}
      <div className="flex items-center justify-center">
        <div className="group flex flex-col items-center gap-2 cursor-pointer">
          <div
            className="
        size-32 rounded-xl bg-primary/10
        flex items-center justify-center
        transition-all duration-300 ease-out
        group-hover:scale-110
        group-hover:-translate-y-2
        group-hover:bg-primary/20
        group-hover:shadow-[0_0_40px_hsl(var(--p)/0.4)]
      "
          >
            <MessageSquare
              className="
          size-16 text-primary
          transition-transform duration-300
          group-hover:scale-110
        "
            />
          </div>

          <h1
            className="
        text-6xl font-bold
        transition-all duration-300
        group-hover:tracking-wider
      "
          >
            WEG
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div
          className="
      my-8 h-px w-full max-w-md
      lg:my-0 lg:h-96 lg:w-px lg:max-w-none lg:scale-x-150
      bg-primary
      shadow-[0_0_25px_hsl(var(--p))]
    "
        />
      </div>

      {/* right side */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-2 text-center mb-8">

          <h1 className="text-3xl font-bold mt-2">Welcome back!</h1>
          <p className="text-base-content/60">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
           

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
               Don&apos;t have an account?{" "}
               <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
export default LogInPage;