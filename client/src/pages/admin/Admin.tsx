import React from "react";
import { createRoot } from "react-dom/client";
import NavBar from "../../components/NavBar";
import "../../index.css";
import 'react-datepicker/dist/react-datepicker.css';
import EventManagementForm from "../../components/EventManagementForm";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <main className="green text-foreground bg-background">
          <NavBar />
          <h1 className="text-3xl text-center">Admin Page</h1>
          <div className="flex flex-col">
            <EventManagementForm/>
          </div>
    
      </main>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
