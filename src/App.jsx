import { useState } from 'react'
import './App.css'
import MaskEntry from './components/Mask-Entry.jsx'
import Navigation from './components/Nav.jsx'
import LoadingScreen from './components/Loading.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <LoadingScreen />

      <div style={{height : '100vh'}}></div>
    </>
  )
}

export default App
