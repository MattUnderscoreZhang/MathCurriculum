export function NavigationSidebar(props: {
    navigationKeys: string[],
    setNavigationKey: Function,
}) {
    return (
        <aside style={{
            minWidth: "320px",
            background: "var(--color-bg-dots)",
            margin: "16px 16px",
            padding: "16px 16px",
        }}>
            <header>
                <h1 style={{
                    fontSize: 24,
                }}>Alex's Math Adventure!</h1>
            </header>
            <br />
            <nav>
                <ul style={{
                    listStyleType: "none",
                }}>
                    {props.navigationKeys.map(key => (
                        <li key={key}>
                            <button
                                onClick={() => props.setNavigationKey(key)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "inherit",
                                    cursor: "pointer",
                                    font: "inherit",
                                }}
                            >
                                {key}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
