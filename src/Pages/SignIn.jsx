import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.png";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col font-['Poppins',sans-serif] overflow-x-hidden bg-[#050b2d] text-white">
      {/* 🔥 NAVBAR/BACK BAR */}
      <header className="flex items-center gap-[10px] px-6 py-4 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
          onClick={() => navigate(-1)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Sign In</span>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-center py-12 px-4 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#020617]/40 backdrop-blur-[2px]" />
      {/* Background Glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Glass card */}
      <div className="relative w-full max-w-[480px] mx-4 px-10 py-12 rounded-[32px] flex flex-col gap-7
        bg-gradient-to-br from-white/[0.07] to-white/[0.01]
        backdrop-blur-[15px]
        border border-white/[0.15]
        shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]">
        
        {/* Shimmer accent */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

        {/* Header */}
        <div className="text-center">
          <h2 className="text-[32px] font-bold text-white tracking-tight">Sign In</h2>
          <p className="text-white/40 text-sm mt-1">Access your AI dashboard</p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-widest ml-1">Email</label>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 focus-within:border-purple-400/50 focus-within:bg-white/[0.06] transition-all">
              <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
              </svg>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none text-white outline-none text-[15px] placeholder-white/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-widest">Password</label>
              <button 
                onClick={() => navigate("/forgot")}
                className="text-purple-400/80 text-[11px] font-medium hover:text-purple-300 transition-colors">Forgot?</button>
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 focus-within:border-purple-400/50 focus-within:bg-white/[0.06] transition-all">
              <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent border-none text-white outline-none text-[15px] placeholder-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          className="w-full py-4 mt-2 rounded-[20px] font-bold text-[16px] text-white
            bg-gradient-to-r from-[#d946ef] to-[#3b82f6]
            shadow-[0_10px_30px_rgba(217,70,239,0.3)]
            hover:shadow-[0_15px_40px_rgba(217,70,239,0.5)] hover:scale-[1.01]
            active:scale-[0.99] transition-all duration-200"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="text-center text-[13px] text-white/40">
          Not a member yet?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-white hover:text-purple-300 font-bold transition-colors underline underline-offset-4 decoration-purple-500/50"
          >
            Sign Up Now
          </button>
        </p>
      </div>
      </div>
    </div>
  );
}
