import '../../App.css'
import { Button } from 'antd';
import globe from "../../images/globe.png"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingView() {
    const navigate = useNavigate();
    const [goToLogin, setGoToLogin] = useState(false);
    
    useEffect(() => {
      if (goToLogin) {
          navigate("/signup");
      }
  }, [goToLogin, navigate]);

  return (
    <div className="image">
      <div>
      <img src={globe} className="globe" alt="Globe" />
      </div>
      <div className="image-overlay">
      <h1 className="landing-logo">GOVerify</h1>
      <h2 className="welcome-message"> Streamlining the management, and storage of international student records at Fisk University’s Office of 
        Global Initiatives, GOVerify ensures an efficient process and offers a seamless experience.</h2>
      <Button onClick={() => setGoToLogin(true)} className="get-started">
        Let's get started
      </Button>
      </div> 
    </div>
      
  )
}

export default LandingView
