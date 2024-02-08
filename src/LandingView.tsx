import './App.css'
import { Button } from 'antd';
import globe from "./images/globe.png"
import { useState } from 'react';
import { Navigate } from 'react-router-dom';



function LandingView() {
    const [goToLogin, setGoToLogin] = useState(false);
    
    if (goToLogin){
    return <Navigate to="/signup"/>
    }

  return (
    <div className="image">
      <div>
      <img src={globe} style={{ width: "140px", marginTop: "30px", float: "right", marginRight: "40px"}} alt="Globe" />
      </div>

      <div className="image-overlay">
      <h1 className="landing-logo">GOVerify</h1>
      <h2 className="welcome-message"> Streamlining the management, and storage of international student records at Fisk University’s Office of 
        Global Initiatives, GOVerify ensures an efficient process and offers a seamless experience.</h2>
      <Button onClick={() => setGoToLogin(true)} style={{ marginTop: "20px", float: "right", marginRight: "50px"}}>
        Let's get started
        </Button>
      </div> 
    </div>
      
  )
}

export default LandingView
