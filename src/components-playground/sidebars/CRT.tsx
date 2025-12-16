import { useState, useEffect } from 'react';

export function NavigationSidebar(props: {
  navigationKeys: string[];
  setNavigationKey: Function;
}) {
  const [active, setActive] = useState(props.navigationKeys[0]);
  const [glow, setGlow] = useState({ x: 0, y: 0 });

  const icons: Record<string, string> = {
    Dashboard: '🏠',
    Addition: '➕',
    Subtraction: '➖',
    Multiplication: '✖️',
    Division: '➗',
    Fractions: '🍕',
    Geometry: '📐',
    Algebra: '🧮',
    Statistics: '📊',
    Settings: '⚙️',
  };

  /* slight fisheye follow */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setGlow({ x: (e.clientX - innerWidth / 2) / innerWidth, y: (e.clientY - innerHeight / 2) / innerHeight });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <aside className="crt">
      {/* glass overlay */}
      <div className="glass" style={{ transform: `translate(${glow.x * 6}px, ${glow.y * 6}px)` }} />
      <div className="scanlines" />
      <div className="flicker" />

      <header className="header">
        <div className="prompt">C:\MATH_QUEST</div>
        <div className="cursor" />
      </header>

      <nav className="nav">
        {props.navigationKeys.map((k) => (
          <button
            key={k}
            onClick={() => {
              props.setNavigationKey(k);
              setActive(k);
            }}
            className={`item ${active === k ? 'active' : ''}`}
          >
            <span className="bullet">►</span>
            <span className="label">{k.toUpperCase()}</span>
            {active === k && <span className="blink">_</span>}
          </button>
        ))}
      </nav>

      <footer className="footer">1985 (c) PC-BOOT</footer>

      <style jsx>{`
        /* ---------- CRT container ---------- */
        .crt {
          --phosphor: #33ff33;
          --deep: #001000;
          --glow: rgba(51, 255, 51, 0.35);
          position: relative;
          width: 280px;
          height: 100vh;
          background: var(--deep);
          color: var(--phosphor);
          font-family: 'Perfect DOS VGA 437 Win', 'Courier New', monospace;
          text-shadow: 0 0 4px var(--glow);
          overflow: hidden;
          user-select: none;
        }

        /* ---------- bubble glass ---------- */
        .glass {
          position: absolute;
          inset: -20px;
          border-radius: 45% / 35%;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0, 255, 0, 0.08) 100%);
          pointer-events: none;
          filter: blur(1px);
          z-index: 9;
        }

        /* ---------- scanlines ---------- */
        .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent 0,
            transparent 2px,
            rgba(0, 255, 0, 0.04) 2px,
            rgba(0, 255, 0, 0.04) 4px
          );
          pointer-events: none;
          z-index: 8;
          animation: roll 8s linear infinite;
        }
        @keyframes roll {
          from { background-position: 0 0; }
          to { background-position: 0 16px; }
        }

        /* ---------- subtle flicker ---------- */
        .flicker {
          position: absolute;
          inset: 0;
          background: rgba(0, 255, 0, 0.02);
          pointer-events: none;
          z-index: 10;
          animation: flick 0.15s infinite;
        }
        @keyframes flick {
          0% { opacity: 0.12; }
          50% { opacity: 0.08; }
          100% { opacity: 0.1; }
        }

        /* ---------- header ---------- */
        .header {
          padding: 1.5rem 1.2rem 1rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .prompt {
          font-size: 1.1rem;
          letter-spacing: 1px;
        }
        .cursor {
          width: 10px;
          height: 18px;
          background: var(--phosphor);
          animation: blink 1s steps(2) infinite;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* ---------- nav ---------- */
        .nav {
          padding: 0 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          width: 100%;
          padding: 0.4rem 0.6rem;
          background: transparent;
          border: none;
          color: var(--phosphor);
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
        }
        .item:hover {
          background: rgba(51, 255, 51, 0.08);
          text-shadow: 0 0 8px var(--phosphor);
        }
        .item.active {
          background: rgba(51, 255, 51, 0.15);
          font-weight: bold;
          text-shadow: 0 0 10px var(--phosphor);
        }
        .bullet {
          font-size: 0.9rem;
        }
        .label {
          flex: 1;
        }
        .blink {
          font-weight: bold;
          animation: blink 1s steps(2) infinite;
        }

        /* ---------- footer ---------- */
        .footer {
          margin-top: auto;
          padding: 1rem 1.2rem;
          font-size: 0.75rem;
          opacity: 0.6;
          text-align: center;
          border-top: 1px solid rgba(51, 255, 51, 0.2);
        }
      `}</style>
    </aside>
  );
}
