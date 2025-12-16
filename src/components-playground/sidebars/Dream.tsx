import { useState } from 'react';

export function NavigationSidebar(props: {
  navigationKeys: string[];
  setNavigationKey: Function;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string>(props.navigationKeys[0]);

  const icons: Record<string, string> = {
    Dashboard: '🎯',
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

  return (
    <aside
      style={{
        position: 'relative',
        width: 260,
        margin: 16,
        borderRadius: 32,
        padding: '28px 0',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, rgba(161, 140, 255, 0.25) 0%, rgba(90, 200, 250, 0.15) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow:
          '0 25px 50px -12px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* slow drifting aurora */}
      <div
        style={{
          position: 'absolute',
          inset: '-100% -100%',
          background:
            'radial-gradient(ellipse at 70% 80%, rgba(199, 120, 255, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 30% 20%, rgba(90, 200, 255, 0.4) 0%, transparent 50%)',
          animation: 'aurora 20s linear infinite',
        }}
      />

      {/* hand-drawn clouds */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.25,
          pointerEvents: 'none',
        }}
        viewBox="0 0 260 600"
      >
        <path
          d="M-40 120 q40 -40 80 0 t80 0 t80 0"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeDasharray="4 6"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="320 0"
            dur="45s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* header */}
      <header
        style={{
          textAlign: 'center',
          marginBottom: 24,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 42,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            animation: 'bob 6s ease-in-out infinite',
          }}
        >
          🌌
        </div>
        <h1
          style={{
            margin: '8px 0 0',
            fontSize: 24,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: 1,
          }}
        >
          Dream Nav
        </h1>
      </header>

      {/* nav list */}
      <nav style={{ position: 'relative', zIndex: 2 }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: '0 16px' }}>
          {props.navigationKeys.map((key) => (
            <li
              key={key}
              style={{
                marginBottom: 10,
                position: 'relative',
              }}
            >
              {active === key && (
                <span
                  style={{
                    position: 'absolute',
                    inset: '-4px -8px',
                    borderRadius: 18,
                    background:
                      'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, transparent 70%)',
                    animation: 'breathe 2.5s ease-in-out infinite',
                    pointerEvents: 'none',
                  }}
                />
              )}
              <button
                onClick={() => {
                  props.setNavigationKey(key);
                  setActive(key);
                }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: 'none',
                  borderRadius: 16,
                  fontSize: 16,
                  fontWeight: 500,
                  color: active === key ? '#0d0d25' : 'rgba(255,255,255,0.9)',
                  background:
                    active === key
                      ? 'rgba(255, 255, 255, 0.9)'
                      : hovered === key
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.4s cubic-bezier(.37,1.2,.26,1)',
                  transform: hovered === key ? 'translateX(6px)' : 'none',
                  boxShadow:
                    active === key
                      ? '0 8px 20px rgba(0,0,0,0.25)'
                      : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                    transition: 'transform 0.3s',
                    transform: hovered === key ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  {icons[key] || '📚'}
                </span>
                <span style={{ flex: 1, textAlign: 'left' }}>{key}</span>
                {active === key && (
                  <span
                    style={{
                      fontSize: 18,
                      animation: 'twinkle 1.2s ease-in-out infinite',
                    }}
                  >
                    ✨
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* keyframes */}
      <style>{`
        @keyframes aurora {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          100% { transform: translateX(-25%) translateY(-25%) rotate(360deg); }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </aside>
  );
}
