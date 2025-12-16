// NavigationSidebar.tsx
import { useState, useRef, useEffect } from 'react';
import './Hologram.css'; // styles below

type Props = {
  navigationKeys: string[];
  setNavigationKey: (key: string) => void;
};

export function NavigationSidebar({ navigationKeys, setNavigationKey }: Props) {
  const [active, setActive] = useState(navigationKeys[0]);
  const navRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // 3-D tilt on mouse-move
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5; // -0.5 … 0.5
        const y = (e.clientY - top) / height - 0.5; // -0.5 … 0.5
        const rotateY = x * 25; // degrees
        const rotateX = -y * 25; // degrees
        el.style.setProperty('--rx', `${rotateX}deg`);
        el.style.setProperty('--ry', `${rotateY}deg`);
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const ul = navRef.current;
    if (!ul) return;
    const handler = (e: KeyboardEvent) => {
      const items = Array.from(ul.querySelectorAll<HTMLButtonElement>('button'));
      const idx = items.findIndex(b => b.dataset.key === active);
      let next = idx;
      if (e.key === 'ArrowDown') next = Math.min(idx + 1, items.length - 1);
      if (e.key === 'ArrowUp') next = Math.max(idx - 1, 0);
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = items.length - 1;
      if (next !== idx) {
        items[next]?.focus();
        items[next]?.click();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, navigationKeys]);

  return (
    <div ref={rootRef} className="hologram-wrapper">
      <aside className="hologram-sidebar">
        <nav>
          <ul ref={navRef}>
            {navigationKeys.map(key => (
              <li key={key}>
                <button
                  data-key={key}
                  tabIndex={0}
                  aria-current={active === key}
                  onClick={() => {
                    setNavigationKey(key);
                    setActive(key);
                  }}
                >
                  <span className="label">{key}</span>
                  <span className="glow" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
