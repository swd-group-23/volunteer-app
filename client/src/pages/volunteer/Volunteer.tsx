import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import VolunteerComponent from './VolunteerComponent';
import "../../index.css";

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <main className='dark text-foreground bg-background'>
                <NavBar/>
                <h1 className='text-3xl'>Volunteer Page</h1>
                <VolunteerComponent /> 
                
            </main>        
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
