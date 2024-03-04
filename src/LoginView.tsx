import globe from "./images/globe.png"
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "./CustomTypes";
import { auth } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginView() {
  var user: User = {role: "",
  username: "", email: "", password: "", confirm_pwd: ""}
  const [currUser, setCurrUser] = useState(user);
  const [goHome, setGoHome] = useState(false);
  
  if (goHome){
  return <Navigate to="/student-home"/>
  }

  const onFinish = (values: User) => {
    setCurrUser(values);
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.email, user.password)
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
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Email" />
      </Form.Item>
      <Form.Item
      className="login-form"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
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