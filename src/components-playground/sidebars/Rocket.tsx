import { useState } from 'react';

export function NavigationSidebar(props: {
    navigationKeys: string[],
    setNavigationKey: Function,
}) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [active, setActive] = useState<string>(props.navigationKeys[0]);

    return (
        <aside style={{
            minWidth: "280px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            margin: "16px",
            borderRadius: "24px",
            padding: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Animated background particles */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: "radial-gradient(circle at 20% 80%, #fff 2px, transparent 2px), radial-gradient(circle at 80% 20%, #fff 2px, transparent 2px), radial-gradient(circle at 40% 40%, #fff 1px, transparent 1px)",
                backgroundSize: "100px 100px, 150px 150px, 80px 80px",
                animation: "float 20s infinite linear",
            }} />

            <header style={{
                textAlign: "center",
                marginBottom: "32px",
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{
                    fontSize: "48px",
                    marginBottom: "8px",
                    animation: "bounce 2s infinite",
                }}>🚀</div>
                <h1 style={{
                    fontSize: "28px",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    margin: 0,
                }}>
                    Math Quest
                </h1>
                <p style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    margin: "8px 0 0 0",
                }}>
                    Choose your adventure!
                </p>
            </header>

            <nav style={{ position: "relative", zIndex: 1 }}>
                <ul style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                }}>
                    {props.navigationKeys.map((key, index) => (
                        <li key={key} style={{ marginBottom: "8px" }}>
                            <button
                                onClick={() => {
                                    props.setNavigationKey(key);
                                    setActive(key);
                                }}
                                onMouseEnter={() => setHovered(key)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    width: "100%",
                                    padding: "16px 20px",
                                    background: active === key 
                                        ? "rgba(255,255,255,0.95)" 
                                        : hovered === key
                                            ? "rgba(255,255,255,0.15)"
                                            : "rgba(255,255,255,0.05)",
                                    border: "none",
                                    borderRadius: "16px",
                                    color: active === key ? "#667eea" : "white",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: active === key ? "bold" : "500",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transform: hovered === key ? "translateX(8px)" : "translateX(0)",
                                    boxShadow: active === key 
                                        ? "0 8px 25px rgba(0,0,0,0.15)"
                                        : "none",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <span style={{
                                    fontSize: "24px",
                                    filter: active === key ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" : "none",
                                    transition: "all 0.3s ease",
                                }}>
                                    📚
                                </span>
                                <span style={{ flex: 1, textAlign: "left" }}>{key}</span>
                                {active === key && (
                                    <span style={{
                                        fontSize: "20px",
                                        animation: "pulse 1.5s infinite",
                                    }}>✨</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    100% { transform: translateY(-100px) rotate(360deg); }
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </aside>
    );
}
