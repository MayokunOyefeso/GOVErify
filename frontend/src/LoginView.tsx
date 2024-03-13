import globe from "./images/globe.png"
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goHome, setGoHome] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  if (goHome){
  return <Navigate to="/student-home"/>
  }


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(
      ()=>{setGoHome(true)}
    )
    .catch ((error) => {
      const errorCode: string | null = error.code
      setAuthErrorMessage(formatErrorCode(errorCode))
    })
  }

  return (
    <div className="image">
        <div>
      <img src={globe} className="globe" alt="Globe" />
      </div>
    <div className="login">
      <h1 className="logo">GOVerify</h1>
      <Form
          name="normal_login"
          initialValues={{ remember: true }}
      >
      <Form.Item
      className="login-form"
      name="user_id"
      rules={[{ required: true, message: 'Please input your Username or Email!' }]}
      >
      <p className="error">{authErrorMessage}</p>
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
      </Form>
      </div>
    </div>
    )
  }
  
  export default LoginView