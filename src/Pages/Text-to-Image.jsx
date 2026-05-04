import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TextImage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("Ghibli");
  const [fade, setFade] = useState(true);

  const ideas = [
    "A giant moon rising behind snowy mountains",
    "A futuristic city glowing at night",
    "A dragon flying over a castle",
    "A peaceful forest with glowing lights",
    "A cyberpunk street in neon rain",
  ];

  const [currentIdea, setCurrentIdea] = useState(ideas[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIdea((prev) => {
          const index = ideas.indexOf(prev);
          return ideas[(index + 1) % ideas.length];
        });
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const styles = [
    "3D",
    "Digital Art",
    "Anime",
    "Pixel",
    "Ghibli",
    "Synthwave",
    "None",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-[url('/bg-image.png')] bg-no-repeat bg-center bg-cover bg-fixed overflow-x-hidden">
      {/* 🔥 NAVBAR */}
      <header className="flex items-center gap-[10px] px-6 py-4 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
          onClick={() => navigate(-1)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#e8f0ff]"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Text to Image</span>
      </header>

      {/* 🔥 CONTENT */}
      <div className="flex-1 flex items-center justify-center lg:justify-start px-6 md:px-12 lg:pl-[120px] py-10 relative overflow-y-auto">
        <div className="w-full max-w-[420px] p-6 md:p-8 rounded-[24px] flex flex-col gap-5 bg-white/10 border border-white/10 text-white shadow-2xl backdrop-blur-md transition-all hover:bg-white/[0.12]">
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">Prompt</h2>

          <textarea 
            placeholder="Enter your prompt..." 
            className="w-full h-[120px] rounded-[18px] p-4 text-sm text-white bg-white/5 border border-white/10 outline-none resize-none placeholder:text-white/20 focus:border-white/20 focus:bg-white/10 transition-all font-sans"
          />

          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <button
                key={style}
                className={`h-8 px-4 rounded-full text-[13px] border transition-all duration-300 transform active:scale-95 ${
                  selectedStyle === style 
                    ? "bg-white/25 border-white/40 shadow-inner" 
                    : "bg-transparent border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
                onClick={() => setSelectedStyle(style)}
              >
                {style}
              </button>
            ))}
          </div>

          <div className="mt-2">
            <h4 className="text-[15px] font-medium text-white/70 mb-2">Explore Ideas</h4>
            <p className={`text-sm text-[#cbd5e1] min-h-[48px] transition-all duration-400 font-medium ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              {currentIdea}
            </p>
          </div>

          <button className="w-full sm:w-[180px] h-12 mx-auto mt-2 rounded-full border-none bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white text-sm font-bold cursor-pointer flex items-center justify-center hover:opacity-90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all uppercase tracking-wide">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextImage;
