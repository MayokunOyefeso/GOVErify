import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import LoginView from './LoginView';
import LandingView from './LandingView';
import SignupView from './SignupView';
import Dashboard from './StudentDashboard';

function App() {

  return (
    <Routes>
        <Route path="/" element={<LandingView/>}></Route>
        <Route path="/signup" element={<SignupView/>}></Route>
        <Route path="/login" element={<LoginView/>}></Route>
        <Route path="/dashboard/*" element={<Dashboard/>}></Route>
        <Route path="/tasks/*" element={<Dashboard/>}></Route>
        <Route path="/requests/*" element={<Dashboard/>}></Route>
        <Route path="/resources/*" element={<Dashboard/>}></Route>
        <Route path="/profile/*" element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default App
