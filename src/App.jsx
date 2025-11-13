import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Tailwind test banner */}
      <div className="mx-auto my-6 max-w-xl p-6 rounded-lg bg-red/5 text-center">
        <h2 className="text-2xl font-semibold text-blue-400">Tailwind test — it should style this text</h2>
        <p className="text-sm text-red-300 mt-2">If this looks styled (blue heading, padded box), Tailwind is active.</p>
      </div>
    </>
  )
}

export default App
