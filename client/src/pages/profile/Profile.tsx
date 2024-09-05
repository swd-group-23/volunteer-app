import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <h1>Profile Page</h1>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
