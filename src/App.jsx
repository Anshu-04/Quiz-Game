import { useState } from 'react'
import Quiz from './Quiz'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Quiz/>
    </>
  )
}

export default App
