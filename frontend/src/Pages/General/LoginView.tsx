import globe from "../../images/globe.png"
import { Button, Form, Input } from 'antd';
import { LockOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { EmailList } from "../../CustomTypes";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import axios from "axios";


function formatErrorCode(errorString: string): string | null {
  const match = /^auth\/(.+)$/.exec(errorString);
  
  if (match) {
    const formattedCode = match[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return formattedCode;
  } else {
    return null;
}
}



function LoginView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [goBack, setGoBack] = useState(false);
  const [password, setPassword] = useState("");
  const [stdHome, setStdHome] = useState(false);
  const [adminHome, setAdminHome] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [pwdResetMessage, setPwdResetMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userDetails, setUserDetaiils] = useState<{ [key: string]: string }>({});
  

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);

    return () => {
      processing = false;
    };
  }, []);

  if (stdHome){
    return <Navigate to="/dashboard"/>
  }

  if (adminHome){
    return <Navigate to="/admin"/>
  }

  const axiosFetchData = async (processing: boolean) => {
    await axios.get("http://localhost:4000/user_emails")
    .then (res => {
      if (processing) {
        var getEmails: {[key: string]: string} = {};
        res.data.forEach((user: EmailList) => {
          getEmails[user.email] = user.role;
      });
        setUserDetaiils(getEmails);
      }
    }).catch(error => console.log(error))
    }
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
    var user = userCredential.user
    if (user.emailVerified){
      if (userDetails[user.email] == "student"){
        setStdHome(true)
      }
      else if (userDetails[user.email] == "admin"){
        setAdminHome(true)
      }
    } else {
      setErrorMessage("Please verify your email.")
    }
  }).catch ((error) => {
    const errorCode: string | null = error.code
    setAuthErrorMessage(formatErrorCode(errorCode))
  })
  }
  
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    setPwdResetMessage("Check your email for the password reset link and follow the instructions to complete the reset process.")
  })
  .catch((error) => {
    const errorCode: string | null = error.code;
    setPwdResetMessage(formatErrorCode(errorCode));
  });
  }
  if (goBack){
    navigate("/signup")
  }

  return (
    <div className="image">
        <div>
      <img src={globe} className="globe" alt="Globe" />
      </div>
    <div className="login">
    <LeftOutlined className="back-arrow" onClick={()=>setGoBack(true)} />
      <h1 className="logo">GOVerify</h1>
      <span className="error">{errorMessage}</span>
      <span className="error">{authErrorMessage}</span>
      <span className="error">{pwdResetMessage}</span>
      <Form
        autoComplete="off"
        name="normal_login"
        initialValues={{ remember: true }}
      >
      <Form.Item
      className="login-form"
      name="user_id"
      rules={[{ required: true, message: 'Please input your Username or Email!' }]}
      >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
      className="login-form"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
    </Form.Item>
    <Form.Item className="login-form">
      <Button htmlType="submit" className="login-form-button" onClick={(signIn)}>
        Login
      </Button>
    </Form.Item>
    <Form.Item className="pwd-redirect-box">
      <h4 className="pwd-redirect"><span className="pwd-redirect-text" onClick={(resetPassword)}>Forgot Password</span></h4>
    </Form.Item>
      </Form>
      </div>
    </div>
    
    )
  }
  
  export default LoginView