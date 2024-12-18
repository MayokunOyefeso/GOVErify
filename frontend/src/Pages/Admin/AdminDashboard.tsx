import { Menu } from "antd";
import { useState } from "react";
import { signOut } from "firebase/auth";
import AdminHomeView from "./HomeView";
import AdminTaskView from "./TaskView";
import { Navigate } from "react-router-dom";
import AdminRequestView from "./RequestView";
import { auth } from "../../firebase/firebase";
import AdminResourceView from "./ResourceView";
import UserView from "./UserView";
import ProfileView from "../General/ProfileView";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, DashboardOutlined, ProfileOutlined, FieldTimeOutlined , PoweroffOutlined, UsergroupAddOutlined } from "@ant-design/icons/lib/icons";

function AdminDashboard() {
    const [goHome, setGoHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (goHome){
        return <Navigate to="/"/>
    }
    
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

    const signout = () => {
        signOut(auth).then(
            ()=>{setGoHome(true), setErrorMessage("Logged Out")}
        )
        .catch ((error) => {
            const errorCode: string | null = error.code
            setErrorMessage(formatErrorCode(errorCode))
        })
        
    }

    return (
        <div className="home">
            <Header/>
            <div className="nav-bar">
                <SideMenu signout={signout} />
                <p>{errorMessage}</p>
                <Content/>
            </div>
        </div>
    );
}

function Header(){
    return(
        <div className="banner">
            <h1 className="header">GOVerify</h1>
        </div>
    )
}

function SideMenu({ signout }) {
    const navigate = useNavigate();
    var currentPath = window.location.pathname;
    var adminIndex = currentPath.indexOf("/admin/");
    var newPath = currentPath.slice(adminIndex + "/admin/".length);

    return(
        <div className="side-menu">
            <Menu className="nav-width"
                defaultSelectedKeys={[newPath]}
                onClick= {({key}) => {
                    if(key === "signout"){
                        signout();
                    } else {
                        navigate(key);
                    }
                }}
                items = {[{label: "Home", icon: <HomeOutlined/>, key:""}, 
                          {label: "Tasks", icon: <FieldTimeOutlined/>, key: "admin-tasks"}, 
                          {label: "Requests", icon: <DashboardOutlined/>, key:"admin-requests"}, 
                          {label: "Resources", icon: <ProfileOutlined />, key:"admin-resources"},
                          {label: "Users", icon: <UsergroupAddOutlined/>, key:"users"},
                          {label: "Profile", icon: <UserOutlined/>, key:"profile"},
                          {label: "Sign out", icon: <PoweroffOutlined/>, key:"signout", danger:true}]}
            ></Menu>
        </div>
    ) 
}

function Content(){
    return (
        <>
            <Routes>
                <Route path="/*" element={<AdminHomeView/>}></Route>
                <Route path="/admin-tasks/*" element={<AdminTaskView/>}></Route>
                <Route path="/admin-requests/*" element={<AdminRequestView/>}></Route>
                <Route path="/admin-resources/*" element={<AdminResourceView/>}></Route>
                <Route path="/profile/*" element={<ProfileView/>}></Route>
                <Route path="/users/*" element={<UserView/>}></Route>
            </Routes>
        </>
    )
}

export default AdminDashboard;
