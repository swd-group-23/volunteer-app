import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <h1 className='underline'>Login Page</h1>
            <div className='underline text-3xl'>Hi</div>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
