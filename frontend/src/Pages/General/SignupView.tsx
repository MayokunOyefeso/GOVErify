import globe from "../../images/globe.png"
import { Button, Select, Form, Input } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { EmailList } from "../../CustomTypes";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase";
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
  const [role, setRole] = useState("Role");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [goToLogin, setGoToLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);
  const [userDetails, setUserDetaiils] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);

    return () => {
      processing = false;
    };
  }, []);

  const resetForm = () => {
    setRole("Role");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPwd("");
  };

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

  const axiosPostData = async() => {
    const postData = {
      role: role,
      username: username,
      email: email
    }
    await axios.post('http://localhost:4000/users', postData).then(() => {
      setConfirmationMessage("Account Successfully Created! \n Verify your email with link to login.");
      setErrorMessage("");
      setPasswordVisible(false);
      setConfirmPwdVisible(false);
      resetForm();
    }).catch((error) => {
      setErrorMessage(formatErrorCode(error.code))});
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
        await sendEmailVerification(user).then(()=>{
          axiosPostData()
          setErrorMessage("");
        })
      }).catch((error) => setErrorMessage(formatErrorCode(error.code)))
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
      <Form
        autoComplete="off"
        name="signup"
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
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
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