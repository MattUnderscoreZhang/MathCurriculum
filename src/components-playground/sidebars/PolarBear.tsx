import { useState, useEffect, useRef } from 'react';
import './PolarBear.css'; // <-- CSS lives below

export function NavigationSidebar(props: {
  navigationKeys: string[];
  setNavigationKey: (key: string) => void;
}) {
  const [active, setActive] = useState(props.navigationKeys[0]);
  const [bearLeft, setBearLeft] = useState(0); // px from top
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const target = itemRefs.current[active];
    if (target) setBearLeft(target.offsetTop);
  }, [active]);

  return (
    <aside className="bear-sidebar">
      <nav>
        <ul>
          {props.navigationKeys.map((key) => (
            <li
              key={key}
              ref={(el) => (itemRefs.current[key] = el)}
              className={key === active ? 'active' : ''}
            >
              <button
                onClick={() => {
                  props.setNavigationKey(key);
                  setActive(key);
                }}
              >
                {key}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Polar bear */}
      <div
        className="polar-bear"
        style={{ transform: `translateY(${bearLeft}px)` }}
      >
        <div className="bear-body" />
        <div className="bear-head" />
      </div>
    </aside>
  );
}
