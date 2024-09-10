import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import '../../index.css'
import VolunteerComponent from './VolunteerComponent';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <main className='dark text-foreground bg-background'>
                <NavBar/>
                <h1 className='text-3xl'>Volunteer Page</h1>
            </main>        
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
