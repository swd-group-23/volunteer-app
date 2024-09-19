import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import '../../index.css'
import LoginComponent from './LoginComponent';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
           <main className='green text-foreground bg-background'>
                <NavBar/>
                <h1 className='text-3xl'>Login Page</h1>
                <LoginComponent/>
            </main>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
