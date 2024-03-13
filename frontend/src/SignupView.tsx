import globe from "./images/globe.png"
import { Button, Select, Form, Input } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EmailList } from "./CustomTypes";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase/firebase";
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

function SignupView() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [goToLogin, setGoToLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);
  const [userDetails, setUserDetaiils] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [dbErrorMessage, setDbErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);

    return () => {
      processing = false;
    };
  }, []);


  const axiosFetchData = async (processing: boolean) => {
    await axios.get("http://localhost:4000/user_emails")
    .then (res => {
      if (processing) {
        var getEmails: {[key: string]: string} = {};
        res.data.forEach((user: EmailList) => {
          getEmails[user._email] = user._role;
      });
        setUserDetaiils(getEmails);
      }
    }).catch(error => console.log(error))
    }

  const axiosPostData = async() => {
    const postData = {
      role: role,
      username: username,
      email: email
    }
    try {
      await axios.post('http://localhost:4000/users', postData);
      setConfirmationMessage("Account Successfully Created! \n Verify your email with link to login.");
      // Clear form fields and error messages
      setRole("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPwd("");
      setErrorMessage("");
      setAuthErrorMessage("");
      setDbErrorMessage("");
      setPasswordVisible(false);
      setConfirmPwdVisible(false);
  } catch (error) {
      setDbErrorMessage(formatErrorCode(error.code));
  }
  }

  const signUp = (e) => {
    e.preventDefault();
    if ((role == "" ) || (username == "" ) || (email == "" ) || (password == "" ) || (confirmPwd == "")){
      setErrorMessage("Please complete the form!")
    }
    else if (Object.keys(userDetails).includes(email) == false){
      setErrorMessage("Invalid email! Please use Fisk University email")
    }
    else if(role != userDetails[email]){
      setErrorMessage("Role Mismatch!")
    }
    else if (password != confirmPwd){
      setErrorMessage("Password mismatch!")
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const user = userCred.user;

        await sendEmailVerification(user)
      })
      .then(() => {
        axiosPostData()
      }).catch ((error) => {setAuthErrorMessage(formatErrorCode(error))})
    }
  }


  if (goToLogin){
    return <Navigate to="/login"/>
  }

  return (
    <div className="image">
        <div>
      <img src={globe} className="globe" alt="Globe" />
      </div>
    <div className="login">
      <h1 className="logo">GOVerify</h1>
      <p className="error">{confirmationMessage}</p>
      <p className="error">{errorMessage}</p>
      <p className="error">{authErrorMessage}</p>
      <p className="error">{dbErrorMessage}</p>
      <Form
          name="signup"
          initialValues={{ remember: true }}
          
      >
      <Select
          labelInValue
          defaultValue={{ value: role, label: 'Role', disabled: true }}
          className="signup-form"
          onChange={(e) => setRole(e.value)}
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
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
      >
      <Input prefix={<MailOutlined className="site-form-item-icon" />} value={email} placeholder="School Email" onChange={(e) => setEmail(e.target.value)}/>
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="password"
      rules={[{ required: true, message: 'Please input your Password!' }]}
      >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        visibilityToggle={{
          visible: passwordVisible,
          onVisibleChange: setPasswordVisible,
        }}
      />
      </Form.Item>
      <Form.Item
      className="signup-form"
      name="confirm_pwd"
      rules={[{ required: true, message: 'Please confirm your Password!' }]}
      >
      <Input.Password
        prefix={<LockOutlined className="site-form-item-icon" />}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPwd(e.target.value)}
        value={confirmPwd}
        visibilityToggle={{
          visible: confirmPwdVisible,
          onVisibleChange: setConfirmPwdVisible,
        }}
      />
      </Form.Item>
      <Form.Item>
      <a className="forgot-password" href="">
        Forgot password?
      </a>
    </Form.Item>

    <Form.Item className="signup-form">
      <Button htmlType="submit" className="login-form-button" onClick={(signUp)}>
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