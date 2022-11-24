import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Friends from './components/Friends/Friends';

function App() {
  return (
    <> 
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/friends' element={<Friends />} />
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
