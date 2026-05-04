import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Icons ─── */
const BackIcon = () => (
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
);

const UploadIcon = () => (
  <svg
    width="46"
    height="42"
    viewBox="0 0 54 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 37C8.5 37 4 32.5 4 27C4 22.5 7 18.8 11.2 17.6C11.1 17.1 11 16.6 11 16C11 10.5 15.5 6 21 6C23.8 6 26.3 7.1 28.1 9C29.7 6.6 32.4 5 35.5 5C40.7 5 45 9.3 45 14.5C45 14.7 45 14.9 44.9 15.1C48.5 16.2 51 19.6 51 23.5C51 28.5 47 32.5 42 32.5H37"
      stroke="white"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="27"
      y1="19"
      x2="27"
      y2="44"
      stroke="white"
      strokeWidth="2.1"
      strokeLinecap="round"
    />
    <polyline
      points="19,36 27,44 35,36"
      fill="none"
      stroke="white"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.45)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ShieldIcon = () => (
  <div className="relative w-[72px] h-[72px] flex items-center justify-center animate-[ccShieldPop_0.55s_cubic-bezier(0.34,1.56,0.64,1)_both]">
    <svg
      className="w-[62px] h-[70px] drop-shadow-[0_0_16px_rgba(34,197,94,0.6)]"
      viewBox="0 0 72 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36 4L6 16v22c0 15.9 12.4 30.8 30 34 17.6-3.2 30-18.1 30-34V16L36 4z"
        fill="url(#shG)"
        stroke="#22c55e"
        strokeWidth="1.5"
      />
      <polyline
        points="22,38 31,47 50,28"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="shG"
          x1="6"
          y1="4"
          x2="66"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#16a34a" />
          <stop offset="1" stopColor="#14532d" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-[-8px] rounded-full bg-radial-gradient from-[rgba(34,197,94,0.2)] to-transparent animate-[ccGlowPulse_2.4s_ease-in-out_infinite]" />
  </div>
);

/* ─── Images ─── */
const PREVIEW_IMG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80";
const RESULT_IMG =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";

/* ─── Component ─── */
export default function Copyright() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [link, setLink] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  const startLoading = (name = "") => {
    setFileName(name);
    setStatus("loading");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 8 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => setStatus("safe"), 500);
      }
      setProgress(Math.min(p, 100));
    }, 120);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setImagePreview(URL.createObjectURL(f));
      startLoading(f.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setImagePreview(URL.createObjectURL(f));
      startLoading(f.name);
    }
  };

  const handleBack = () => {
    setStatus("idle");
    setProgress(0);
    setLink("");
    setFileName("");
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDownload = async () => {
    try {
      const imgSrc = imagePreview || RESULT_IMG;
      if (!imgSrc) return;
      const response = await fetch(imgSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "copyright-checked.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col font-['Nunito',sans-serif] overflow-hidden bg-[url('/bg-image.png')] bg-no-repeat bg-center bg-cover bg-fixed">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap");
        @keyframes ccFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ccShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes ccShieldPop {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ccGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.35); opacity: 0.25; }
        }
        @keyframes ccGrowBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-ccFadeUp { animation: ccFadeUp 0.4s ease both; }
        .animate-ccShimmer { animation: ccShimmer 1.6s ease-in-out infinite; }
        .animate-ccGrowBar { animation: ccGrowBar 0.8s ease both; }
      `}</style>

      {/* Background layers */}
      <div className="fixed inset-0 z-0 bg-[url('/bg-image.png')] bg-no-repeat bg-center bg-cover" />
      <div className="fixed bottom-0 right-0 w-[45%] h-[55%] bg-[radial-gradient(circle,rgba(80,130,255,0.28)_1.1px,transparent_1.1px)] bg-[size:16px_16px] z-0 pointer-events-none" />
      <div className="fixed left-[-80px] bottom-[80px] w-[360px] h-[360px] bg-[radial-gradient(circle,rgba(20,80,220,0.14)_0%,transparent_70%)] blur-[50px] z-0 pointer-events-none" />
      <div className="fixed left-[16%] bottom-[10%] w-[260px] h-[200px] bg-[radial-gradient(circle,rgba(120,40,200,0.18)_0%,transparent_70%)] blur-[55px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col min-h-screen animate-ccFadeUp">
        {/* ── NAVBAR ── */}
        <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45">
          <div onClick={() => navigate(-1)} className="cursor-pointer hover:scale-110 active:scale-90 transition-transform">
            <BackIcon />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Copyright Checker</span>
        </header>

        {/* ── MAIN CONTENT ── */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 px-5 md:px-10 lg:px-[60px] py-6 items-start overflow-y-auto z-10">
          {/* ════ LEFT CARD ════ */}
          <div className="w-full lg:w-[320px] bg-white/10 border border-[#4664c3]/20 rounded-[24px] p-6 backdrop-blur-[20px] shadow-2xl shrink-0">
            <p className="font-bold text-[1rem] text-white/90 mb-4 tracking-tight">Upload your content</p>

            {/* Drop Zone */}
            <div
              className={`border-1.5 border-dashed rounded-2xl bg-[#121e4b]/32 flex flex-col items-center justify-center gap-[10px] p-6 cursor-pointer transition-all relative ${
                dragOver ? "border-[#6e91ff] bg-[#233a8c]/38 shadow-[0_0_18px_rgba(80,120,255,0.1)]" : "border-[#5069c8]/42 hover:bg-[#233a8c]/38 hover:border-[#6e91ff]/55"
              } ${status === "loading" ? "opacity-75 cursor-wait" : ""}`}
              onClick={() => status !== "loading" && fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <input ref={fileRef} type="file" hidden onChange={handleFileChange} />
              <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#19329b]/32">
                <UploadIcon />
              </div>
              <span className="text-sm text-white/50 text-center tracking-tight leading-relaxed">
                {fileName ? fileName : "Drag & drop file here or click to browse"}
              </span>
            </div>

            {/* OR */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#4664be]/18" />
              <span className="text-[0.72rem] text-white/30 tracking-widest uppercase font-bold">or</span>
              <div className="flex-1 h-px bg-[#4664be]/18" />
            </div>

            {/* Link input */}
            <div className="flex items-center gap-2 bg-[#0c163c]/60 border border-[#415fb9]/20 rounded-xl px-4 py-3 focus-within:border-[#5a87ff]/42 transition-all">
              <LinkIcon />
              <input
                className="bg-transparent border-none outline-none text-sm text-white/85 w-full placeholder:text-white/30"
                placeholder="Paste link here..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && link.trim() && startLoading()}
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-6">
              <button
                className="w-full py-4 border-none rounded-full bg-gradient-to-r from-[#c23ee8] to-[#e03d8a] text-white text-[15px] font-bold cursor-pointer tracking-wider shadow-[0_4px_20px_rgba(190,55,200,0.4)] transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-45 disabled:cursor-not-allowed uppercase"
                onClick={() => {
                  if (status === "idle") startLoading();
                  else if (status === "safe") setStatus("changed");
                  else if (status === "changed") handleBack();
                }}
                disabled={status === "loading"}
              >
                {status === "changed" ? "Check Again" : "Change Copyright"}
              </button>
            </div>

            {/* Preview */}
            <div className="relative mt-6 rounded-xl overflow-hidden aspect-video border border-[#3c5ab0]/16 shadow-lg">
              <img src={imagePreview || PREVIEW_IMG} alt="preview" className="w-full h-full object-cover brightness-75" />
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white tracking-widest bg-black/20">Preview</div>
            </div>
          </div>

          {/* ════ RIGHT PANEL ════ */}
          <div className="flex-1 min-h-[400px] w-full flex items-center justify-center py-6 lg:py-0">
            {/* IDLE */}
            {status === "idle" && (
              <div className="flex flex-col items-center gap-6 text-center opacity-40 animate-ccFadeUp">
                <svg width="80" height="80" viewBox="0 0 72 80" fill="none">
                  <path d="M36 4L6 16v22c0 15.9 12.4 30.8 30 34 17.6-3.2 30-18.1 30-34V16L36 4z" fill="rgba(80,100,200,0.1)" stroke="rgba(120,140,255,0.25)" strokeWidth="1.5" />
                </svg>
                <p className="text-xl text-[#7a90bb] leading-relaxed max-w-sm">Upload a file or paste a link to check for copyright issues</p>
              </div>
            )}

            {/* LOADING */}
            {status === "loading" && (
              <div className="w-full flex flex-col items-center gap-6 text-center animate-ccFadeUp">
                <div className="w-full max-w-md h-2 bg-[#4b5fa0]/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4f8fff] to-[#00d4ff] shadow-[0_0_14px_#00d4ff] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-sm font-bold text-[#7a90bb] tracking-widest uppercase animate-pulse">Analyzing Content...</span>
              </div>
            )}

            {/* SAFE */}
            {status === "safe" && (
              <div className="w-full flex flex-col items-center gap-8 text-center animate-ccFadeUp">
                <ShieldIcon />
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">No copyright issues found</h2>
                  <p className="text-lg text-[#7a90bb]">Your content appears to be original and safe to use</p>
                </div>

                <div className="flex items-center gap-4 w-full max-w-md bg-white/5 p-5 rounded-2xl border border-white/5">
                  <div className="flex-1 h-2.5 bg-[#465aa0]/18 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] shadow-[0_0_14px_rgba(34,197,94,0.65)] animate-ccGrowBar" />
                  </div>
                  <span className="text-xl font-bold text-[#22c55e]">100%</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#101c42]/90 border border-[#4664be]/25 rounded-2xl text-white font-bold transition-all hover:bg-[#1e3278]/80 hover:border-[#648cff]/40 shadow-lg" onClick={handleDownload}>
                    <DownloadIcon /> Download
                  </button>
                  <button className="flex-1 px-8 py-4 border-none rounded-2xl bg-gradient-to-r from-[#c23ee8] to-[#e03d8a] text-white font-bold shadow-[0_4px_20px_rgba(190,55,200,0.38)] transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0" onClick={() => setStatus("changed")}>
                    Regenerate
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-4">
                  {["Fast Copyright scan", "AI similarity detection", "Safe for creation"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-[#8a9fc0]">
                      <span className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_7px_#00d4ff]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHANGED */}
            {status === "changed" && (
              <div className="w-full max-w-2xl flex flex-col items-start gap-5 animate-ccFadeUp">
                <p className="text-xs font-black text-[#7a90bb] tracking-[0.25em] uppercase">Copyright Removed Successfully</p>

                <div className="w-full rounded-[24px] overflow-hidden border border-[#4f8fff]/25 shadow-[0_20px_60px_rgba(0,0,0,0.4)] group relative">
                  <img src={imagePreview || RESULT_IMG} alt="result" className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#101c42]/90 border border-[#4f8fff]/25 rounded-2xl text-white font-bold transition-all hover:bg-[#1e3278]/80 shadow-lg" onClick={handleDownload}>
                    <DownloadIcon /> Download Result
                  </button>
                  <button className="flex-1 py-4 bg-gradient-to-r from-[#c23ee8] to-[#e03d8a] border-none rounded-2xl text-white font-bold shadow-[0_4px_20px_rgba(190,55,200,0.38)] transition-all hover:opacity-90 active:scale-95" onClick={() => setStatus("safe")}>
                    Regenerate AI
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4 p-6 bg-white/5 rounded-[24px] border border-white/5 backdrop-blur-sm">
                  {["AI copyright changer", "Fast processing", "Safe creation"].map((f, i) => (
                    <div key={i} className="flex flex-row sm:flex-col gap-3 sm:gap-2 items-center sm:items-start">
                      <span className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_7px_#00d4ff] shrink-0" />
                      <span className="text-[10px] md:text-xs font-black text-[#e8f0ff] uppercase tracking-widest">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
