import globe from "../../images/globe.png";
import { Button, Form, Input } from "antd";
import { LockOutlined, LeftOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { EmailList } from "../../CustomTypes";
import { signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from "firebase/auth";
import axios from "axios";
import ErrorModal from "../../Components/ErrorModal";

function formatErrorCode(errorString: string): string | null {
  const match = /^auth\/(.+)$/.exec(errorString);

  if (match) {
    const formattedCode = match[1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
  const [pwdResetMessage, setPwdResetMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userDetails, setUserDetaiils] = useState<{ [key: string]: string }>({});

  // Navigate based on role
  useEffect(() => {
    if (stdHome) {
      navigate("/dashboard");
    }
    if (adminHome) {
      navigate("/admin");
    }
    if (goBack) {
      navigate("/signup");
    }
  }, [stdHome, adminHome, goBack, navigate]);

  // Fetch user details on mount
  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);

    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchData = async (processing: boolean) => {
    try {
      const res = await axios.get("http://localhost:4000/user_emails");
      if (processing) {
        const getEmails: { [key: string]: string } = {};
        res.data.forEach((user: EmailList) => {
          getEmails[user.email] = user.role;
        });
        console.log("Fetched user details:", getEmails); // Debug log
        setUserDetaiils(getEmails);
      }
    } catch (error) {
      console.error("Error fetching user emails:", error);
    }
  };

  // Monitor auth state on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && userDetails[user.email]) {
        if (userDetails[user.email] === "student") {
          setStdHome(true);
        } else if (userDetails[user.email] === "admin") {
          setAdminHome(true);
        }
      }
    });
    return () => unsubscribe();
  }, [userDetails]);

  // Sign-in handler
  const signIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Ensure local persistence
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        if (userDetails[user.email] === "student") {
          setStdHome(true);
        } else if (userDetails[user.email] === "admin") {
          setAdminHome(true);
        }
      } else {
        setErrorMessage("Please verify your email.");
        setIsModalVisible(true);
      }
    } catch (error) {
      const errorCode: string | null = error.code;
      const message = formatErrorCode(errorCode);
      if (message === "Invalid Credential") {
        setAuthErrorMessage("Invalid email or password");
      } else {
        setAuthErrorMessage(message);
      }
      setIsModalVisible(true);
    }
  };

  // Reset password handler
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setPwdResetMessage("Check your email for the password reset link and follow the instructions to complete the reset process.");
      })
      .catch((error) => {
        const errorCode: string | null = error.code;
        setPwdResetMessage(formatErrorCode(errorCode));
      });
    setIsModalVisible(true);
  };
  
  // Close modal handler
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setErrorMessage("");
    setAuthErrorMessage("");
    setPwdResetMessage("");
  };

  return (
    <div className="image">
      <div>
        <img src={globe} className="globe" alt="Globe" />
      </div>
      <div className="login">
        <LeftOutlined className="back-arrow" onClick={() => setGoBack(true)} />
        <h1 className="logo">GOVerify</h1>
        <Form autoComplete="off" name="normal_login" initialValues={{ remember: true }}>
          <Form.Item
            className="login-form"
            name="user_id"
            rules={[{ required: true, message: "Please input your Username or Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="login-form"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
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
            <Button htmlType="submit" className="login-form-button" onClick={signIn}>
              Login
            </Button>
          </Form.Item>
          <Form.Item className="pwd-redirect">
            <h4 className="pwd-redirect-text">
              <span className="pwd-redirect-text" onClick={resetPassword}>
                Forgot Password
              </span>
            </h4>
          </Form.Item>
        </Form>
      </div>

      <ErrorModal
        visible={isModalVisible}
        errorMessage={errorMessage || authErrorMessage || pwdResetMessage}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default LoginView;
