import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Index } from '/src/pages/Index'
import { Playground } from '/src/components-playground/Playground'

import './main.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Index />
    </StrictMode>,
)
