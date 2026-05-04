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
      setInput(event.results[0][0].transcript);
    };
    recognition.current.onend = () => setState("idle");
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
    <div className="relative w-full min-h-screen flex flex-col font-sans overflow-x-hidden text-white">
      <style>{`
        @keyframes pulse-mic {
          0% { box-shadow: 0 0 0 0 rgba(217,70,239,0.7); }
          70% { box-shadow: 0 0 0 14px rgba(217,70,239,0); }
          100% { box-shadow: 0 0 0 0 rgba(217,70,239,0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-mic { animation: pulse-mic 2s infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .msg-enter { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background with darker overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none" />

      {/* Navigation Bar */}
      <header className="relative z-50 flex items-center gap-4 px-6 py-4 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform p-2 -ml-2" 
          onClick={() => navigate("/")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-tight">Sora AI</span>
          <span className="text-[10px] text-white/40 uppercase tracking-[2px]">Generative Intelligence</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden">
        
        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6 mb-4">
          {messages.length === 0 && state === "idle" && (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60 px-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-medium mb-2">How can I help you?</h2>
              <p className="text-sm text-white/60 max-w-xs">Ask me anything - I'm here to assist with your creative journey.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`msg-enter flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${
                msg.sender === "user" ? "bg-gradient-to-br from-[#d946ef] to-[#3b82f6]" : "bg-white/10 border border-white/10"
              }`}>
                {msg.sender === "user" ? "U" : "AI"}
              </div>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user" ? "bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white rounded-tr-sm" : "bg-white/[0.08] text-white/90 border border-white/[0.07] rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {state === "listening" && (
            <div className="flex flex-col items-center gap-3 py-6 msg-enter">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d946ef] to-[#3b82f6] animate-mic flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                </svg>
              </div>
            </div>
          )}

          {state === "thinking" && (
            <div className="flex gap-2.5 msg-enter">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold">AI</div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.08] border border-white/[0.07] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-blink" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-blink" style={{ animationDelay: "200ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-blink" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 pb-5 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] rounded-2xl px-3 py-2.5 focus-within:border-white/20 transition-all">
            <button 
              onClick={startListening}
              className={`p-2 rounded-xl transition-all ${state === "listening" ? "text-[#d946ef] bg-[#d946ef]/10" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message Sora AI..."
              className="flex-1 bg-transparent border-none text-sm text-white outline-none placeholder:text-white/20"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 rounded-xl text-white transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
