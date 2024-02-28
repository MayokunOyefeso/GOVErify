import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import LoginView from './LoginView';
import LandingView from './LandingView';
import SignupView from './SignupView';
import StudentHome from './StudentHome';
import TaskView from "./TaskView";
import { useNavigate } from '../node_modules/react-router-dom/dist/index';
import { Menu } from '../node_modules/antd/es/index';


function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<LandingView/>}></Route>
        <Route path="/signup" element={<SignupView/>}></Route>
        <Route path="/login" element={<LoginView/>}></Route>
        <Route path="/student-home" element={<StudentHome/>}></Route>
    </Routes>
    </Router>
  )
}

export default App
