import globe from "./images/globe.png"
import { Button, Select, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Navigate } from "react-router-dom";

function SignupView() {
    const [goToLogin, setGoToLogin] = useState(false);
    
    if (goToLogin){
    return <Navigate to="/login"/>
    }

    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        console.log(value); 
      };
    const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    };

    return (
      <div className="image">
         <div>
      <img src={globe} style={{ width: "140px", marginTop: "30px", float: "right", marginRight: "40px"}} alt="Globe" />
      </div>
      <div className="login">
        <h1 className="logo">GOVerify</h1>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
        <Select
            labelInValue
            defaultValue={{ value: 'role', label: 'Role', disabled: true }}
            className="login-dropdown"
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
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </Form.Item>
        <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="login-form-button">
          Sign up
        </Button>
        <h4 className="login-redirect">Already have an account? <a className="login-redirect" onClick={() => setGoToLogin(true)}>Login</a> </h4>
      </Form.Item>
        </Form>
        </div>
      </div>
    )
  }
  
  export default SignupView