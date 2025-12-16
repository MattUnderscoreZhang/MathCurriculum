import { useState } from 'react';
import './FileStack.css';

export function NavigationSidebar(props: {
  navigationKeys: string[];
  setNavigationKey: (key: string) => void;
}) {
  const [active, setActive] = useState<string>(props.navigationKeys[0]);

  return (
    <aside className="card-catalog">
      <div className="drawer">
        <ul className="card-deck">
          {props.navigationKeys.map((key, idx) => (
            <li
              key={key}
              className={`card ${active === key ? 'active' : ''}`}
              style={{ '--i': idx } as React.CSSProperties}
              onClick={() => {
                props.setNavigationKey(key);
                setActive(key);
              }}
            >
              <span className="card-label">{key}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
