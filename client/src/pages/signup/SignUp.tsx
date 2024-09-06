import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from '../../components/NavBar';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import '../../index.css'
import SignUpComponent from './SignUpComponent';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
           <main className='green text-foreground bg-background'>
                <NavBar/>
                <SignUpComponent/>
            </main>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
