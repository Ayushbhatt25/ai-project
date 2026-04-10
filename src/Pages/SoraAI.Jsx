import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.svg";

export default function SoraAI() {
  const navigate = useNavigate();
  const [state, setState] = useState("idle");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "en-US";
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startListening = () => {
    if (!recognition.current) {
      alert("Speech Recognition not supported in this browser");
      return;
    }
    setState("listening");
    recognition.current.start();

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.current.onend = () => {
      setState("idle");
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setState("thinking");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is Sora AI responding. How can I help you today? 🤖", sender: "ai" },
      ]);
      setState("idle");
    }, 1500);
  };

  return (
    <div className="relative w-full h-screen flex flex-col font-sans overflow-hidden bg-[#020617] text-white">
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse 1.8s infinite ease-in-out; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* 🔥 NAVBAR */}
      <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
          onClick={() => navigate(-1)}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Sora AI</span>
      </header>

      {/* 🔥 MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-start relative px-10 md:px-[120px] py-4 bg-transparent overflow-y-auto">
        
       
        {/* 🔥 CHAT PANEL */}
        <div className="lg:ml-auto w-full md:w-[320px] h-[440px] bg-white/10 border border-white/10 rounded-[28px] p-6 relative flex flex-col shadow-2xl shrink-0">
          
          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 mb-20 pr-1">
            {messages.length === 0 && state === "idle" && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <p className="text-base font-medium">How may I help you today?</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[90%] p-3 rounded-[16px] text-[13px] leading-relaxed ${
                  msg.sender === "user" 
                  ? "ml-auto bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white rounded-br-none shadow-md" 
                  : "mr-auto bg-white/10 text-white/90 rounded-tl-none border border-white/5"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {state === "listening" && (
              <div className="flex flex-col items-center gap-4 py-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d946ef] to-[#3b82f6] animate-pulse-slow shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">Listening...</p>
              </div>
            )}
            
            {state === "thinking" && (
              <div className="text-center italic text-white/20 text-[11px] py-2">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 🔥 TRANSPARENT PROMPT BOX (Like WatermarkRemover) */}
          <div className="absolute bottom-6 left-5 right-5 flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus-within:border-blue-500/50 transition-all shadow-inner">
            <button 
              onClick={startListening}
              disabled={state !== 'idle'}
              className={`p-2 transition-colors ${state === 'listening' ? 'text-red-500' : 'text-white/30 hover:text-white/60'}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or speak..."
              className="flex-1 bg-transparent border-none outline-none text-[13px] py-2 px-2 placeholder:text-white/20 text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            {state === 'thinking' ? (
              <div className="p-2">
                <div className="w-4 h-4 border-2 border-white/10 border-t-white/80 rounded-full animate-spin" />
              </div>
            ) : (
              <button 
                onClick={handleSend}
                className="ml-2 p-2 rounded-lg bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white hover:opacity-90 active:scale-95 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
