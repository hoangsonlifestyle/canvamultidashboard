import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, Key, Mail, ShieldAlert } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('you@company.com');
  const [password, setPassword] = useState('********');
  const [errorValid, setErrorValid] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorValid('Please enter a valid email address');
      return;
    }
    if (password.length < 4) {
      setErrorValid('Password must be at least 4 characters');
      return;
    }

    setIsLoading(true);
    setErrorValid('');
    // Simulate minor delay for premium animation effect
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email);
    }, 800);
  };

  return (
    <div id="login_screen" className="min-h-screen w-full flex bg-white font-sans antialiased text-[#1A1C1C]">
      {/* Left Panel: Brand & Imagery (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#00C4CC] via-[#5A32FA] to-[#7D2AE8] overflow-hidden items-center justify-center p-12">
        {/* Abstract background elements */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
          {/* Brand Text */}
          <div className="space-y-3 mb-8">
            <span className="font-semibold tracking-[0.14em] text-white/80 uppercase text-xs">
              Canva Academy for SMEs
            </span>
            <h1 className="font-raleway text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
              Multi Dashboard
            </h1>
            <p className="text-white/75 text-sm max-w-sm mx-auto">
              Unlock data-driven learning insights tailored for modern small and medium enterprises.
            </p>
          </div>

          {/* Subtle Product Mockup Display */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/25 bg-white/10 backdrop-blur-md p-4"
          >
            <img 
              alt="Dashboard Mockup" 
              className="w-full h-auto rounded-lg object-cover opacity-95 shadow-inner" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGibgF_G4yBWgOR3lpL-mmcAxF-aAXc11e6lr3iRVTEb-etjddu38D6LJPLoNkQUM5M4uFhVBmm4smXZtQCUBrNT-R1j9fDVqfjLZjf57TXFfvfO5ibPeeRQeY4YcriuaO2QQUjpvmzB8j7bTJDpAgsOImDV4KevB4YcjS-t0XgtMFQIPA0TWmd5JmeIVS6p5QdgEJ4jcqNp6SQqy7Il1whiYoUyRPUEaFzcpb11LgryfF1Mm1e7I4g2PTuEoFX072xB3DzRhwxgPe"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-16 bg-[#FFFFFF]">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          {/* Mobile Only Brand Header */}
          <div className="lg:hidden text-center mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5A32FA]">
              Canva Academy for SMEs
            </span>
            <h1 className="text-3xl font-extrabold font-raleway bg-clip-text text-transparent bg-gradient-to-r from-[#00C4CC] via-[#5A32FA] to-[#7D2AE8] mt-1">
              Multi Dashboard
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-raleway text-[#1A1C1C] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-[#454556]">
              Sign in to continue to your analytics dashboards.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {errorValid && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-600 animate-fadeIn">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorValid}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#454556]" htmlFor="email">
                Email address
              </label>
              <div className="relative input-glow rounded-lg transition-all duration-200">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#c6c5d9] rounded-lg text-sm text-[#1a1c1c] placeholder-gray-400 focus:outline-none focus:border-[#4A53FA] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#454556]" htmlFor="password">
                  Password
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Mock password reset link clicked! For development use password validation is bypassed."); }} className="text-xs text-[#5A32FA] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative input-glow rounded-lg transition-all duration-200">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Key className="w-4.5 h-4.5" />
                </span>
                <input 
                  id="password"
                  name="password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#c6c5d9] rounded-lg text-sm text-[#1a1c1c] placeholder-gray-400 focus:outline-none focus:border-[#4A53FA] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button with beautiful Canva multi-gradient */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-md font-bold text-sm text-white bg-gradient-to-r from-[#00C4CC] via-[#5A32FA] to-[#7D2AE8] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A53FA] transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <LogIn className="w-4.5 h-4.5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Login Assist */}
          <div className="pt-2 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              SME Operations Team Account Access.
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <button 
                onClick={() => { setEmail('alex.ops@canva.com'); setPassword('admin123'); }}
                className="text-[11px] bg-gray-50 hover:bg-gray-100 text-gray-600 px-2.5 py-1 rounded border border-gray-200 transition-colors cursor-pointer"
              >
                Use Alex Ops Creds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
