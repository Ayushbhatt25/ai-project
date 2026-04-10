import { useEffect, useRef, useState } from "react";
import "./Pricingpage.css";

export default function PricingPage() {
  const canvasRef = useRef(null);

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
      // draw faint lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
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
    <div style={styles.wrapper}>
      {/* Animated canvas background */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Background radial glow */}
      <div style={styles.glowBL} />
      <div style={styles.glowTR} />

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Affordable &amp; Flexible</h1>
        <p style={styles.subheading}>
          Starting at just <span style={styles.badge}>₹ 199</span>
        </p>

        <div style={styles.cardsRow}>
          {/* Free Plan */}
          <div
            style={{
              ...styles.cardOuter,
              transform:
                hovered === "free" ? "translateY(-10px) scale(1.03)" : "none",
              boxShadow:
                hovered === "free"
                  ? "0 0 50px rgba(124,58,237,0.8), 0 0 80px rgba(124,58,237,0.4)"
                  : styles.cardOuter.boxShadow,
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
                  {[
                    "Limited free attempts per feature",
                    "Basic usage for testing tools",
                    "Access to Selected AI tools",
                    "Standard Processing Speed",
                  ].map((f) => (
                    <li key={f} style={styles.featureItem}>
                      <span style={styles.featureLeft}>
                        <span style={styles.bullet}>•</span>
                        <span>{f}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                style={{
                  ...styles.btn,
                  ...styles.btnFree,
                  transform: hovered === "free" ? "scale(1.05)" : "none",
                }}
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Paid Unlocks */}
          <div
            style={{
              ...styles.cardOuter,
              ...styles.cardOuterPaid,
              transform:
                hovered === "paid" ? "translateY(-10px) scale(1.03)" : "none",
              boxShadow:
                hovered === "paid"
                  ? "0 0 40px rgba(168,85,247,0.7)"
                  : styles.cardOuterPaid.boxShadow,
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
                    ["Image Watermark Remover", "₹ 99"],
                    ["AI SEO Planner", "₹ 299"],
                    ["Video Watermark Remover", "₹ 299"],
                  ].map(([label, price]) => (
                    <li key={label} style={styles.featureItem}>
                      <span style={{ display: 'flex', gap: '6px' }}>
                        <span style={styles.bullet}>•</span> {label}
                      </span>
                      <span style={styles.price}>{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button style={{ ...styles.btn, ...styles.btnPaid }}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    background: 'url("/src/assets/bg.png") no-repeat center center',
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "Rajdhani, sans-serif",
  },
  canvas: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  glowBL: {
    position: "absolute",
    bottom: "-80px",
    left: "-80px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(80,0,180,0.25) 0%, transparent 70%)",
    zIndex: 0,
  },
  glowTR: {
    position: "absolute",
    top: "-60px",
    right: "-60px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,100,200,0.15) 0%, transparent 70%)",
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
    width: "100%",
    maxWidth: "900px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 12px 0",
    textAlign: "center",
    letterSpacing: "0.3px",
  },
  subheading: {
    fontSize: "15px",
    color: "#cccccc",
    margin: "0 0 36px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Rajdhani, sans-serif",
  },
  badge: {
    background: "#e53935",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    padding: "3px 10px",
    borderRadius: "4px",
  },
  cardsRow: {
    display: "flex",
    gap: "24px",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  cardOuter: {
    width: "300px",
    minHeight: "370px",
    borderRadius: "16px",
    padding: "2px",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5, #2563eb)",
    boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.2)",
  },
  cardOuterPaid: {
    background: "linear-gradient(135deg, #2d2d4e, #1a1a3e)",
    boxShadow: "0 0 20px rgba(60,60,120,0.4)",
  },
  cardInner: {
    background: "linear-gradient(160deg, #0e0e2a 0%, #111130 100%)",
    borderRadius: "14px",
    padding: "28px 26px 24px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "366px",
    boxSizing: "border-box",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 4px 0",
    textAlign: "center",
  },
  cardSub: {
    fontSize: "13px",
    color: "#8888bb",
    margin: "0 0 18px 0",
    textAlign: "center",
  },
  featuresBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "16px 18px",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "20px",
    flex: 1,
  },
  featureList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  featureItem: {
    fontSize: "13.5px",
    color: "#ccccdd",
    lineHeight: "1.4",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontFamily: "Rajdhani, sans-serif",
  },
  featureLeft: {
    display: "flex",
    gap: "6px",
  },
  bullet: {
    color: "#7c3aed",
    fontWeight: "bold",
    flexShrink: 0,
  },
  price: {
    color: "#ffffff",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  btn: {
    width: "100%",
    padding: "13px 0",
    borderRadius: "30px",
    border: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "all 0.25s ease",
  },
  btnFree: {
    background: "linear-gradient(90deg, #a855f7, #6366f1)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
  },
  btnPaid: {
    background: "linear-gradient(90deg, #c026d3, #7c3aed)",
    color: "#fff",
    boxShadow: "0 4px 20px rgba(192,38,211,0.4)",
  },
};
