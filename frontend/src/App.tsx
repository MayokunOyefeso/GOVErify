import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import LoginView from './Pages/General/LoginView';
import LandingView from './Pages/General/LandingView';
import SignupView from './Pages/General/SignupView';
import Dashboard from './Pages/Student/StudentDashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';

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
        <Route path="/admin/*" element={<AdminDashboard/>}></Route>
        <Route path="/admin-tasks/*" element={<AdminDashboard/>}></Route>
        <Route path="/admin-requests/*" element={<AdminDashboard/>}></Route>
        <Route path="/admin-resources/*" element={<AdminDashboard/>}></Route>
        <Route path="/users/*" element={<AdminDashboard/>}></Route>
        <Route path="/profile/*" element={<AdminDashboard/>}></Route>
    </Routes>
  )
}

export default App
