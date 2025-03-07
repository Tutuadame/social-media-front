import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NoPage, Home, Profile } from './pages/index'
import { Layout } from './global/index'

function App() {
  return (
    <BrowserRouter>
    <Routes>            
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />        
        <Route path="*" element={<NoPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
