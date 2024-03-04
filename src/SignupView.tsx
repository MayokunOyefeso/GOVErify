import globe from "./images/globe.png"
import { Button, Select, Form, Input } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "./CustomTypes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";

function SignupView() {
  var user: User = {role: "",
          username: "", email: "", password: "", confirm_pwd: ""}
  const [goToLogin, setGoToLogin] = useState(false);
  // const [currUser, setCurrUser] = useState(user);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      console.log(userCredential)
    }).catch ((error) => {console.log(error)
    })
  }
  if (goToLogin){
  return <Navigate to="/login"/>
  }

  // const onFinish = (values: User) => {
  // setCurrUser(values);
  // };

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
      <Select
          labelInValue
          defaultValue={{ value: 'role', label: 'Role', disabled: true }}
          className="signup-form"
          onChange={(e) => {user.role = e.value}}
          options={[
          {
              value: 'student',
              label: 'Student',
          },
          {
              value: 'admin',
              label: 'Admin',
          },
          ]}
      />
      <Form.Item
      className="signup-form"
      name="username"
      rules={[{ required: true, message: 'Please input your Username!' }]}
      >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => {user.username = e.target.value}}/>
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
      >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="School Email" onChange={(e) => {user.email = e.target.value}}/>
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
        onChange={(e) => {user.password = e.target.value}}
      />
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="confirm_pwd"
      rules={[{ required: true, message: 'Please confirm your Password!' }]}
      >
      <Input
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => {user.confirm_pwd = e.target.value}}
      />
      </Form.Item>
      <Form.Item>
      <a className="forgot-password" href="">
        Forgot password?
      </a>
    </Form.Item>

    <Form.Item className="signup-form">
      <Button htmlType="submit" className="login-form-button" onClick={() => {signUp}}>
        Sign up
      </Button>
      <h4 className="login-redirect" onClick={() => setGoToLogin(true)}>Already have an account? Login </h4>
    </Form.Item>
      </Form>
      </div>
    </div>
  )
  }
  
  export default SignupView