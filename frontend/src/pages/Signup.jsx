import { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from "lucide-react";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  // Password strength validation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]+/)) strength += 25;
    if (password.match(/[A-Z]+/)) strength += 25;
    if (password.match(/[0-9]+/)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password === confirmPassword && password !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
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
        "http://localhost:3000/api/v1/user/signup",
        { username, email, password },
        { withCredentials: true }
      );
      
      toast.success("Account created successfully! 🎉", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      console.log("Failed to submit signup form:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.", {
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
      </div>

      {/* Signup Card */}
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
                  Join the Vibe
                  <Sparkles size={20} className="text-indigo-200" />
                </h2>
                <p className="text-indigo-100 text-sm mt-1 opacity-90">
                  Create your account and start listening
                </p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                <User size={16} className="text-indigo-400" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white pr-10"
                  required
                />
                {username && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <CheckCircle size={16} className="text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                <Mail size={16} className="text-indigo-400" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white pr-10"
                  required
                />
                {email && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <CheckCircle size={16} className="text-green-500" />
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
                  placeholder="Create a password"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white pr-12"
                  required
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }}
                        className={`h-full rounded-full transition-all ${
                          passwordStrength >= item * 25
                            ? item <= 1 ? 'bg-red-500' :
                              item <= 2 ? 'bg-orange-500' :
                              item <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                            : 'bg-indigo-900/30'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-indigo-300/60">
                    {passwordStrength < 50 ? 'Weak' : 
                     passwordStrength < 75 ? 'Medium' : 
                     passwordStrength < 100 ? 'Strong' : 'Very Strong'} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                <Lock size={16} className="text-indigo-400" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 
                           focus:border-transparent transition-all duration-200 
                           placeholder:text-indigo-300/30 text-white pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-indigo-400/60 hover:text-indigo-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {confirmPassword && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2"
                  >
                    {passwordsMatch ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </motion.div>
                )}
              </div>
            </div>



            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !passwordsMatch}
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
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-sm text-indigo-300/60">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors 
                         relative inline-block group"
              >
                Sign in
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r 
                               from-indigo-400 to-purple-400 transform scale-x-0 
                               group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;