import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password },
        { withCredentials: true }
      );
      
      toast.success("Welcome back! ✨", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Invalid email or password", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     w-96 h-96 bg-violet-600/5 rounded-full blur-3xl"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-indigo-500/20">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Welcome Back
                  <Sparkles size={20} className="text-indigo-200" />
                </h2>
                <p className="text-indigo-100 text-sm mt-1 opacity-90">
                  Sign in to continue to your music
                </p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <LogIn className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                <Mail size={16} className="text-indigo-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white"
                />
                {email && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                <Lock size={16} className="text-indigo-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-indigo-400/60 hover:text-indigo-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-indigo-500/30 bg-slate-800/50 
                           text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0
                           cursor-pointer"
                />
                <span className="text-sm text-indigo-300/60">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => toast("Password reset feature coming soon!")}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold 
                       text-white transition-all duration-200 disabled:opacity-50 
                       disabled:cursor-not-allowed flex items-center justify-center gap-2
                       shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40
                       relative overflow-hidden group"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-indigo-300/60">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors 
                         relative inline-block group"
              >
                Create account
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r 
                               from-indigo-400 to-purple-400 transform scale-x-0 
                               group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </p>
          </form>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}

export default Login;