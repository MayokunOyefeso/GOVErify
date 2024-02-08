import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import LoginView from './LoginView';
import LandingView from './LandingView';
import SignupView from './SignupView';

function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<LandingView/>}></Route>
        <Route path="/signup" element={<SignupView/>}></Route>
        <Route path="/login" element={<LoginView/>}></Route>
    </Routes>
    </Router>
  )
}

export default App
