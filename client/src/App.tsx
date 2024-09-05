import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (

        <>
          <div className='flex gap-6 justify-center'>
            <a href='/pages/login/'>Login</a>
            <a href='/pages/profile/'>Profile</a>
            <a href='/pages/admin/'>Admin</a>
            <a href='/pages/volunteer/'>Volunteer</a>
      
          </div>
          <h1>Volunteer App - Alina</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>

        </>
  )
}

export default App
