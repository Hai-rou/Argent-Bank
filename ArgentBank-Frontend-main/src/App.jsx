import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Homepage } from './pages/Homepage.jsx';
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { Error } from './pages/Error.jsx';
import Login from "./pages/login.jsx"
import User from "./pages/User.jsx"
import SupportLog from './Support_JS/supportLog.js';
import AuthInitializer from './Support_JS/AuthInitializer.js';


const App = () => {

  return (  
    <BrowserRouter>
    <AuthInitializer />
    <SupportLog />        
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<User/>} />
        <Route path='*' element={<Error />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
