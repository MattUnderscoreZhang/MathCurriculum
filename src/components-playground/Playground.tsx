import { NavigationSidebar } from '/src/components-playground/sidebars/FileStack'

export function Playground() {
    return (
        <div style={{
            position: 'relative',
            margin: '16px 16px',
            padding: '16px 16px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <NavigationSidebar
                navigationKeys={["Link A", "Link B", "Link C"]}
                setNavigationKey={() => {}}
            />
        </div>
    )
}
