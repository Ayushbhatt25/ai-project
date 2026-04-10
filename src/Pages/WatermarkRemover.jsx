import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ── SVG Icons ──
const IconChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[22px] h-[22px] text-[#e8f0ff] cursor-pointer hover:opacity-70 transition-opacity"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconUpload = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[26px] h-[26px] text-[#4f8fff]"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconLink = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[15px] h-[15px] text-[#7a90bb]"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconDownload = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[15px] h-[15px]"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconGrid = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-[56px] h-[56px] text-[#4f8fff]"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M3 9l4-4 4 4 4-4 4 4" />
    <path d="M3 15l4-4 4 4 4-4 4 4" />
  </svg>
);

// ── Particles (generated once at module level) ──
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  dur: `${3 + Math.random() * 5}s`,
  delay: `${Math.random() * 6}s`,
}));

// ── Main Component ──
export default function WatermarkRemover() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [resultSrc, setResultSrc] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [linkVal, setLinkVal] = useState("");
  const [shaking, setShaking] = useState(false);

  const fileInputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target.result);
      setResultSrc(null);
      setStatus("idle");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      processFile(e.dataTransfer.files[0]);
    },
    [processFile],
  );

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
    e.target.value = "";
  };

  const startProcessing = useCallback(() => {
    if (!previewSrc && !linkVal.trim()) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      return;
    }
    setStatus("loading");
    setResultSrc(null);
    setTimeout(() => {
      setResultSrc(previewSrc);
      setStatus("done");
    }, 2400);
  }, [previewSrc, linkVal]);

  const handleRegenerate = () => {
    if (!previewSrc) return;
    setStatus("loading");
    setResultSrc(null);
    setTimeout(() => {
      setResultSrc(previewSrc);
      setStatus("done");
    }, 2000);
  };

  const handleDownload = () => {
    if (!resultSrc) return;
    const a = document.createElement("a");
    a.href = resultSrc;
    a.download = "watermark-removed.png";
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-['Nunito',sans-serif] bg-[url('/bg-image.png')] bg-cover bg-center bg-fixed text-[#e8f0ff]">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap");
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.7; transform: scale(1.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barAnim {
          0% { width: 0%; }
          60% { width: 78%; }
          100% { width: 100%; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-7px); }
          75% { transform: translateX(7px); }
        }
        .animate-sparkle { animation: sparkle var(--dur) var(--delay) ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fadeUp { animation: fadeUp 0.45s ease both; }
        .animate-bar { animation: barAnim 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.3s ease !important; }
      `}</style>

      {/* Background flows */}
      <svg
        className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-35"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f8fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4f8fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c850c0" stopOpacity="0" />
            <stop offset="50%" stopColor="#4158d0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c850c0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-80 420 Q 280 100 650 320 T 1350 200 T 1550 450" stroke="url(#lg1)" strokeWidth="1.5" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;35,-22;0,0" dur="13s" repeatCount="indefinite" />
        </path>
        <path d="M-80 620 Q 350 240 720 480 T 1440 300" stroke="url(#lg1)" strokeWidth="1" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;-22,35;0,0" dur="17s" repeatCount="indefinite" />
        </path>
        <path d="M120 -30 Q 480 300 840 180 T 1440 420" stroke="url(#lg2)" strokeWidth="1" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;22,18;0,0" dur="15s" repeatCount="indefinite" />
        </path>
        <path d="M-120 720 Q 240 360 840 600 T 1560 360" stroke="url(#lg2)" strokeWidth="0.8" fill="none">
          <animateTransform attributeName="transform" type="translate" values="0,0;-18,-28;0,0" dur="21s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="fixed w-[2px] h-[2px] rounded-full bg-[#00d4ff] pointer-events-none z-0 animate-sparkle"
          style={{
            left: p.left,
            top: p.top,
            "--dur": p.dur,
            "--delay": p.delay,
          }}
        />
      ))}

      {/* App shell */}
      <div className="relative z-10 flex flex-col min-h-screen animate-fadeUp">
        {/* Header */}
        <header className="flex items-center gap-[10px] px-6 py-3 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <IconChevronLeft />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Watermark Remover</span>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col md:flex-row gap-10 px-5 md:px-20 py-4 items-start">
          {/* ── LEFT: Upload card + Preview ── */}
          <div className="flex flex-col w-full md:w-[320px] shrink-0">
            <div className="bg-white/10 border border-[#4f8fff]/25 rounded-[20px] p-6 md:p-7 pt-7 shadow-[0_10px_48px_rgba(0,18,70,0.7),0_0_0_1px_rgba(79,143,255,0.07)]">
              <div className="font-bold text-[15px] text-[#d6e4ff] mb-4 tracking-tight">Upload your content</div>

              {/* Dropzone */}
              <div
                className={`border-1.5 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  dragOver ? "border-[#4f8fff] bg-[#4f8fff]/10" : "border-[#4f8fff]/45 bg-[#4f8fff]/5 hover:border-[#4f8fff] hover:bg-[#4f8fff]/10"
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <div className="w-[52px] h-[52px] rounded-full bg-[#4f8fff]/20 flex items-center justify-center animate-float">
                  <IconUpload />
                </div>
                <div className="text-sm font-medium text-[#7a90bb] text-center leading-relaxed">Drag & drop file here</div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#4f8fff]/15" />
                <span className="text-xs font-medium text-[#7a90bb]">or</span>
                <div className="flex-1 h-px bg-[#4f8fff]/15" />
              </div>

              {/* Link input */}
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <IconLink />
                </div>
                <input
                  className="w-full bg-[#4f8fff]/5 border border-[#4f8fff]/25 rounded-xl py-3 pl-9 pr-4 text-sm font-medium text-[#e8f0ff] outline-none focus:border-[#4f8fff] transition-colors placeholder:text-[#7a90bb] placeholder:font-normal"
                  type="text"
                  placeholder="Paste link here..."
                  value={linkVal}
                  onChange={(e) => setLinkVal(e.target.value)}
                />
              </div>

              {/* Remove button */}
              <button
                className={`w-full mt-4.5 py-3.5 border-none rounded-xl bg-gradient-to-br from-[#c850c0] to-[#4158d0] text-white text-[15px] font-bold cursor-pointer tracking-wider transition-all shadow-[0_4px_22px_rgba(200,80,192,0.4)] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_7px_30px_rgba(200,80,192,0.6)] active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed ${
                  shaking ? "animate-shake" : ""
                }`}
                disabled={status === "loading"}
                onClick={startProcessing}
              >
                Remove
              </button>
            </div>

            {/* Preview */}
            {previewSrc && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-[#4f8fff]/20 relative shadow-2xl animate-fadeUp">
                <img src={previewSrc} alt="Preview" className="w-full h-[200px] object-cover" />
                <div className="absolute inset-x-0 bottom-0 pt-7 pb-3 px-3.5 bg-gradient-to-t from-black/70 to-transparent font-bold text-[15px] text-white tracking-[0.06em] text-center">Preview</div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Result panel ── */}
          <div className="flex-[2] flex flex-col gap-4 animate-fadeUp delay-100 min-w-0 w-full">
            {/* Idle hint */}
            {status === "idle" && !resultSrc && (
              <div className="flex flex-col items-center justify-center gap-3.5 py-32 opacity-35 text-center">
                <IconGrid />
                <p className="text-sm font-medium text-[#7a90bb] leading-loose">
                  Upload an image or paste a link
                  <br />
                  to remove its watermark instantly
                </p>
              </div>
            )}

            {/* Loading */}
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center gap-4.5 py-32">
                <div className="w-full max-w-[400px] h-1.5 bg-[#4f8fff]/15 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#4f8fff] to-[#00d4ff] shadow-[0_0_14px_#00d4ff] animate-bar" />
                </div>
                <div className="text-sm font-medium text-[#7a90bb] tracking-widest">Loading.</div>
              </div>
            )}

            {/* Done */}
            {status === "done" && resultSrc && (
              <div className="space-y-4 animate-fadeUp">
                <div className="text-[12.5px] font-semibold text-[#7a90bb] tracking-[0.06em]">Watermark Removed</div>

                <div className="rounded-[18px] overflow-hidden border border-[#4f8fff]/25 shadow-[0_10px_48px_rgba(0,0,0,0.6),0_0_30px_rgba(79,143,255,0.1)]">
                  <img src={resultSrc} alt="Result" className="w-full h-[320px] object-cover" />
                </div>

                <div className="flex items-center gap-3.5 pt-2">
                  <button 
                    className="flex items-center gap-2.5 px-6 py-3 bg-[#101c42]/90 border border-[#4f8fff]/35 rounded-xl text-[#e8f0ff] text-sm font-bold cursor-pointer transition-all hover:border-[#4f8fff] hover:bg-[#4f8fff]/15"
                    onClick={handleDownload}
                  >
                    <IconDownload /> Download
                  </button>
                  <button 
                    className="px-6.5 py-3 border-none rounded-xl bg-gradient-to-br from-[#4158d0] to-[#00d4ff] text-white text-sm font-bold cursor-pointer tracking-tight transition-all shadow-[0_4px_20px_rgba(0,212,255,0.35)] hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_7px_26px_rgba(0,212,255,0.5)]"
                    onClick={handleRegenerate}
                  >
                    Regenerate
                  </button>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  {[
                    "AI watermark remover",
                    "Fast copyright processing",
                    "Creation safe tools"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[13.5px] font-medium text-[#8a9fc0]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff] shadow-[0_0_7px_#00d4ff] shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
