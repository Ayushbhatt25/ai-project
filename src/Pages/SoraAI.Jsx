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
        .animate-mic { animation: pulse-mic 1.2s infinite; }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.1; }
        }
        .animate-blink { animation: blink 1s infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-enter { animation: fadeSlideUp 0.25s ease forwards; }
      `}</style>

      {/* ── BACKGROUND: fully visible ── */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]/10" />

      {/* ── NAVBAR ── */}
      <header className="relative flex items-center gap-3 px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-black/15 shrink-0 z-50">
        <div
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform"
          onClick={() => navigate(-1)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight text-[#e8f0ff]">Sora AI</span>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-4 md:px-8 py-8 z-10">
        <div className="w-full max-w-[480px] flex flex-col ml-auto" style={{ height: "min(580px, 76vh)" }}>
          <div
            className="relative flex-1 flex flex-col rounded-[28px] overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            style={{ background: "rgba(4, 10, 34, 0.52)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d946ef] via-[#3b82f6] to-[#06b6d4]" />
            <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-6 pb-3 space-y-4">
              {messages.length === 0 && state === "idle" && (
                <div className="h-full flex flex-col items-center justify-center text-center gap-5 pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d946ef]/20 to-[#3b82f6]/20 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(217,70,239,0.2)]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <defs>
                        <linearGradient id="gChat" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d946ef"/>
                          <stop offset="100%" stopColor="#3b82f6"/>
                        </linearGradient>
                      </defs>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="url(#gChat)"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80 font-semibold text-base mb-1">How can I help you?</p>
                    <p className="text-white/30 text-sm">Powered by Sora AI — ask me anything</p>
                  </div>
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
            <div className="px-4 pb-5 pt-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] rounded-2xl px-3 py-2.5">
                <button onClick={startListening} disabled={state !== "idle"} className="text-white/30 hover:text-white/70"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg></button>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Sora AI anything…" className="flex-1 bg-transparent border-none outline-none text-sm text-white" onKeyDown={(e) => e.key === "Enter" && handleSend()} />
                <button onClick={handleSend} disabled={!input.trim()} className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#d946ef] to-[#3b82f6] text-white flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
