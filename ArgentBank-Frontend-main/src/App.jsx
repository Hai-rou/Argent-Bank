import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Homepage } from './pages/Homepage.jsx';
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import Login from "./pages/login.jsx"
import User from "./pages/User.jsx"


const App = () => {

  return (  
    <BrowserRouter>        
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<User/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
