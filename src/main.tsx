import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Index } from '/src/pages/Index'

import './main.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Index />
    </StrictMode>,
)
