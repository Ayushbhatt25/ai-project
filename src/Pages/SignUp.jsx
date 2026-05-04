import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.png";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fullName, setFullName] = useState("");
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
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Sign Up</span>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-center py-12 px-4 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImg})` }}
        />
        <div className="absolute inset-0 z-0 bg-[#020617]/40 backdrop-blur-[2px]" />
      {/* Glass card */}
      <div className="relative w-full max-w-[480px] mx-4 px-9 py-10 rounded-[30px] flex flex-col gap-6
        bg-white/[0.04] backdrop-blur-[20px]
        border border-white/[0.12]
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        
        {/* Title */}
        <h2 className="text-center text-white text-[32px] font-bold mb-2">
          Sign Up
        </h2>

        {/* Input Groups */}
        <div className="flex flex-col gap-5">
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[13.5px] font-medium ml-1">Full Name</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-white/20 bg-white/[0.02] focus-within:border-white/40 transition-all">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent border-none text-white outline-none text-[15px] placeholder-white/30"
              />
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[13.5px] font-medium ml-1">Email</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-white/20 bg-white/[0.02] focus-within:border-white/40 transition-all">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none text-white outline-none text-[15px] placeholder-white/30"
              />
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-white text-[13.5px] font-medium ml-1">Password</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-white/20 bg-white/[0.02] focus-within:border-white/40 transition-all">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent border-none text-white outline-none text-[15px] placeholder-white/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/60 hover:text-white transition-colors"
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

        {/* Terms */}
        <div className="flex items-center gap-3 mt-1 ml-1">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="w-4 h-4 rounded bg-transparent border-white/30 checked:bg-purple-600 cursor-pointer"
          />
          <span className="text-[13px] text-white/80">
            I agree to Terms & Conditions
          </span>
        </div>

        {/* Submit Button */}
        <button
          disabled={!checked}
          className="w-full py-[14px] rounded-full font-bold text-[17px] text-white
            bg-gradient-to-r from-[#fc4eb5] to-[#4e8cff]
            hover:scale-[1.01] active:scale-[0.99] transition-all
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-[13.5px] text-white/60">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-white font-bold hover:underline transition-all"
          >
            Sign in
          </button>
        </p>

      </div>
      </div>
    </div>
  );
}
