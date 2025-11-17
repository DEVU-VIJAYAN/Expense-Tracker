import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 to-indigo-200">
        <nav className="w-full bg-white/80 backdrop-blur shadow-sm px-8 py-4 flex gap-8 border-b">
          <Link className="font-semibold text-gray-700 hover:text-red-600" to="/">Home</Link>
          <Link className="font-semibold text-gray-700 hover:text-blue-600" to="/transactions">Transactions</Link>
          <Link className="font-semibold text-gray-700 hover:text-blue-600" to="/analytics">Analytics</Link>
        </nav>


        <main className="w-full max-w-4xl mx-auto py-10 px-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
