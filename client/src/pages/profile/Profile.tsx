import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import '../../index.css';
import 'react-datepicker/dist/react-datepicker.css';
import ProfileManagementForm from './ProfileManagementForm';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <main className='dark text-foreground bg-background'>
                <NavBar />
                <ProfileManagementForm/>

            </main>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}

