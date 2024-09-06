import { useState } from 'react'
import NavBar from './components/NavBar';
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Login",
    "Profile",
    "Admin",
    "Volunteer"
  ];

  return (

        <>
          
          <NavBar/>
          <h1 className='text-3xl'>Volunteer App</h1>
          

        </>
  )
}

export default App
