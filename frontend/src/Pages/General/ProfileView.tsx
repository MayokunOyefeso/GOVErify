import '../pages.css';
import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

function ProfileView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <>
        <div className='profile-content'>
        
        <Form
        name="profile-info"
        initialValues={{ remember: true }}>
        <Form.Item
        className="login-form"
        name="user_id">
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item
        className="login-form"
        name="user_email">
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item
        className="login-form"
        name="password">
        <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}/>
        </Form.Item>
        <Form.Item className="login-form">
        <Button htmlType="submit" className='profile-edit' >
            Edit
        </Button>
    </Form.Item>
        </Form>

        </div>
        
        </>
    )
    
}

export default ProfileView