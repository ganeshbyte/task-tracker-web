import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>This is a todo app</h1>
      <p>This is todo showing</p>
    </>
  )
}

export default App
