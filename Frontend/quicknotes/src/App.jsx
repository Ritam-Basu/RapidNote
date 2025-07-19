import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/dashboard" element={<Homepage/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
