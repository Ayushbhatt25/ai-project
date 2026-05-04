import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg.png";
import "./Pricingpage.css";

export default function PricingPage() {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,100,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120,80,220,${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div 
      className="relative w-full min-h-screen flex flex-col font-['Rajdhani',sans-serif] overflow-x-hidden bg-[#020617] text-white"
      style={{ 
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <header className="flex items-center gap-[10px] px-6 py-4 border-b border-[#4f8fff]/15 backdrop-blur-md bg-[#060d1f]/45 shrink-0 z-50">
        <div className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-bold text-lg md:text-xl tracking-tight text-[#e8f0ff]">Pricing</span>
      </header>

      <div style={styles.glowBL} />
      <div style={styles.glowTR} />

      <div className="flex-1 relative flex items-center justify-center py-10 px-4">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" />
        <div style={styles.content}>
          <h1 style={styles.heading}>Affordable & Flexible</h1>
          <p style={styles.subheading}>Starting at just <span style={styles.badge}>₹ 199</span></p>

          <div style={styles.cardsRow}>
            <div
              style={{
                ...styles.cardOuter,
                transform: hovered === "free" ? "translateY(-10px) scale(1.03)" : "none",
                boxShadow: hovered === "free" ? "0 0 50px rgba(124,58,237,0.8)" : styles.cardOuter.boxShadow,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHovered("free")}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={styles.cardInner}>
                <h2 style={styles.cardTitle}>Free Plan</h2>
                <p style={styles.cardSub}>Best for beginners</p>
                <div style={styles.featuresBox}>
                  <ul style={styles.featureList}>
                    {["Limited free attempts", "Basic usage", "Selected AI tools", "Standard Speed"].map((f) => (
                      <li key={f} style={styles.featureItem}>
                        <span style={styles.featureLeft}><span style={styles.bullet}>•</span><span>{f}</span></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button style={{ ...styles.btn, ...styles.btnFree }}>Start Free Trial</button>
              </div>
            </div>

            <div
              style={{
                ...styles.cardOuter,
                ...styles.cardOuterPaid,
                transform: hovered === "paid" ? "translateY(-10px) scale(1.03)" : "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setHovered("paid")}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={styles.cardInner}>
                <h2 style={styles.cardTitle}>Paid Unlocks</h2>
                <p style={styles.cardSub}>Best for power creators</p>
                <div style={styles.featuresBox}>
                  <ul style={styles.featureList}>
                    {[
                      ["Text-to-Video", "₹ 199"],
                      ["Copyright Changer", "₹ 299"],
                      ["Watermark Remover", "₹ 99"],
                      ["AI SEO Planner", "₹ 299"],
                    ].map(([label, price]) => (
                      <li key={label} style={styles.featureItem}>
                        <span style={{ display: 'flex', gap: '6px' }}><span style={styles.bullet}>•</span>{label}</span>
                        <span style={styles.price}>{price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button style={{ ...styles.btn, ...styles.btnPaid }}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  glowBL: { position: "absolute", bottom: "-80px", left: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(80,0,180,0.25) 0%, transparent 70%)", zIndex: 0 },
  glowTR: { position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,100,200,0.15) 0%, transparent 70%)", zIndex: 0 },
  content: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", width: "100%", maxWidth: "900px" },
  heading: { fontSize: "36px", fontWeight: "700", color: "#ffffff", margin: "0 0 12px 0", textAlign: "center" },
  subheading: { fontSize: "15px", color: "#cccccc", margin: "0 0 36px 0", display: "flex", alignItems: "center", gap: "8px" },
  badge: { background: "#e53935", color: "#fff", fontWeight: "700", fontSize: "14px", padding: "3px 10px", borderRadius: "4px" },
  cardsRow: { display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", width: "100%" },
  cardOuter: { width: "340px", minHeight: "370px", borderRadius: "16px", padding: "2px", background: "linear-gradient(135deg, #7c3aed, #4f46e5, #2563eb)", boxShadow: "0 0 30px rgba(124,58,237,0.5)" },
  cardOuterPaid: { background: "linear-gradient(135deg, #2d2d4e, #1a1a3e)", boxShadow: "0 0 20px rgba(60,60,120,0.4)" },
  cardInner: { background: "linear-gradient(160deg, #0e0e2a 0%, #111130 100%)", borderRadius: "14px", padding: "28px 26px 24px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box" },
  cardTitle: { fontSize: "22px", fontWeight: "600", color: "#ffffff", margin: "0 0 4px 0" },
  cardSub: { fontSize: "13px", color: "#8888bb", margin: "0 0 18px 0" },
  featuresBox: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "16px 18px", width: "100%", boxSizing: "border-box", marginBottom: "20px", flex: 1 },
  featureList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" },
  featureItem: { fontSize: "13.5px", color: "#ccccdd", lineHeight: "1.4", display: "flex", alignItems: "flex-start", justifyContent: "space-between" },
  featureLeft: { display: "flex", gap: "6px" },
  bullet: { color: "#7c3aed", fontWeight: "bold" },
  price: { color: "#ffffff", fontWeight: "600" },
  btn: { width: "100%", padding: "13px 0", borderRadius: "30px", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer", transition: "all 0.25s ease" },
  btnFree: { background: "linear-gradient(90deg, #a855f7, #6366f1)", color: "#fff" },
  btnPaid: { background: "linear-gradient(90deg, #c026d3, #7c3aed)", color: "#fff" },
};
