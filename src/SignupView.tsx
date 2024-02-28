import globe from "./images/globe.png"
import { Button, Select, Form, Input } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";

function SignupView() {
    const [goToLogin, setGoToLogin] = useState(false);
    const [userStatus, setUserStatus] = useState("");

    if (goToLogin){
    return <Navigate to="/login"/>
    }

    const handleChange = (value: { value: string; label: React.ReactNode }) => {
       setUserStatus(value.value);
    };

    const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    };

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
        <Select
            labelInValue
            defaultValue={{ value: 'role', label: 'Role', disabled: true }}
            className="signup-form"
            onChange={handleChange}
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
        className="signup-form"
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
        >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="School Email" />
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
        />
        </Form.Item>
        <Form.Item
        className="signup-form"
        name="confirm-password"
        rules={[{ required: true, message: 'Please confirm your Password!' }]}
        >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
        </Form.Item>
        <Form.Item>
        <a className="forgot-password" href="">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item className="signup-form">
        <Button htmlType="submit" className="login-form-button">
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