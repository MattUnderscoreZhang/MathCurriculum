import { useState } from 'react';

export function NavigationSidebar(props: {
    navigationKeys: string[],
    setNavigationKey: Function,
}) {
    const [active, setActive] = useState<string>(props.navigationKeys[0]);

    return (
        <aside>
            <nav>
                <ul>
                    {props.navigationKeys.map(key => (
                        <li key={key}>
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
        </aside>
    );
}
