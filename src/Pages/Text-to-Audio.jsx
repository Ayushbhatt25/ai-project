import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TextAudio() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("Lo-fi");
  const [fade, setFade] = useState(true);

  const ideas = [
    "Peaceful lo-fi beats for studying",
    "Techno rhythm with heavy bass",
    "Cinematic orchestral theme for an epic battle",
    "Chill jazz piano in a rainy café",
    "Futuristic synthwave soundscape",
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
    "Lo-fi",
    "Techno",
    "Orchestral",
    "Jazz",
    "Synthwave",
    "Ambient",
    "None",
  ];

  return (
    <div className="w-full h-screen flex flex-col font-sans bg-[url('/bg-image.png')] bg-no-repeat bg-center bg-cover bg-fixed overflow-hidden">
      {/* 🔥 NAVBAR */}
      <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div 
          className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" 
          onClick={() => navigate(-1)}
        >
          <svg
            width="19"
            height="19"
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
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Text to Audio</span>
      </header>

      {/* 🔥 CONTENT */}
      <div className="flex-1 flex items-start md:items-center md:pl-[120px] md:pr-0 md:justify-start justify-center p-5 pt-8 md:pt-10 relative overflow-y-auto">
        <div className="w-full max-w-[380px] p-6 md:p-7 rounded-[20px] flex flex-col gap-[14px] bg-white/10 border border-white/10 text-white shadow-2xl transition-all hover:bg-white/[0.12]">
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">Prompt</h2>

          <textarea 
            placeholder="Describe the sound you want..." 
            className="w-full h-[100px] rounded-[18px] p-4 text-sm text-white bg-white/5 border border-white/10 outline-none resize-none placeholder:text-white/20 focus:border-white/20 focus:bg-white/10 transition-all font-sans"
          />

          <div className="flex flex-wrap gap-2.5">
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
            <p className={`text-sm text-[#cbd5e1] min-h-[40px] transition-all duration-400 font-medium ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
              {currentIdea}
            </p>
          </div>

          <button className="w-[160px] md:w-[180px] h-10 md:h-10 mx-auto mt-4 rounded-full border-none bg-gradient-to-r from-[#d946ef] to-[#3b82f6] text-white text-sm font-bold cursor-pointer flex items-center justify-center hover:opacity-90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95 transition-all uppercase tracking-wide">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default TextAudio;
