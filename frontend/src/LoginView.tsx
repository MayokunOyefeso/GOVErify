import globe from "./images/globe.png"
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "./CustomTypes";
import { auth } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goHome, setGoHome] = useState(false);
  
  if (goHome){
  return <Navigate to="/student-home"/>
  }

  const onFinish = (values: User) => {
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential)
    }).catch ((error) => {console.log(error)
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
          onFinish={onFinish}
      >
      <Form.Item
      className="login-form"
      name="user_id"
      rules={[{ required: true, message: 'Please input your Username or Email!' }]}
      >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
      className="login-form"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
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