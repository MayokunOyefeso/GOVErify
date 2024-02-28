import { HomeOutlined, UserOutlined, DashboardOutlined, ProfileOutlined, FieldTimeOutlined , PoweroffOutlined, CopyrightOutlined } from "@ant-design/icons/lib/icons";
import { Menu } from "antd";
import { Route, Routes, useNavigate } from '../node_modules/react-router-dom/dist/index';
// import {
//     AppstoreOutlined,
//     ContainerOutlined,
//     DesktopOutlined,
//     MailOutlined,
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     PieChartOutlined,
//   } from '@ant-design/icons';
//   import type { MenuProps } from 'antd';
//   import { Button, Menu } from 'antd';
// import { useState } from 'react';
  
//   type MenuItem = Required<MenuProps>['items'][number];

//   function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
//     type?: 'group',
//   ): MenuItem {
//     return {
//       key,
//       icon,
//       children,
//       label,
//       type,
//     } as MenuItem;
//   }

//   const items: MenuItem[] = [
//     getItem('Home', '1', <HomeIcon style={{fontSize:"2rem" }}/>),
//     getItem('Tasks', '2', <TaskAltIcon style={{fontSize:"2rem"}}/>),
//     getItem('Requests', '3', <PendingActionsIcon style={{fontSize:"2rem"}}/>),
//     getItem('Resources', '4', <DescriptionIcon style={{fontSize:"2rem"}}/>)
//   ];
    
    function Content(){
        return (
            <>
            <Routes>
            <Route path="/student-home" element={<div>Home</div>}></Route>
            <Route path="/tasks" element={<div>Tasks</div>}></Route>
            <Route path="/requests" element={<div>Requests</div>}></Route>
            <Route path="/resources" element={<div>Resources</div>}></Route>
            <Route path="/profile" element={<div>Profile</div>}></Route>
            </Routes>
            </>
        )
    }
    function Header(){
        return(
            <div className="banner">
                 <h1 className="header">GOVerify</h1>
            </div>
        )
    }
    function Footer(){
        return(
            <div className="footer">
                <p>&copy;2024</p>
            </div>
        )
    }

    function SideMenu() {
        const navigate = useNavigate();

        return(
            <div className="side-menu">
            <Menu className="nav-width"
        onClick= {({key}) => {
            if(key === "signout"){
                navigate("/");
            }else{
                navigate(key);
            }
        }}

        items = {[{label: "Home", icon: <HomeOutlined/>, key:"/student-home"}, 
        {label: "Tasks", icon: <FieldTimeOutlined/>, key: "/tasks"}, 
        {label: "Requests", icon: <DashboardOutlined/>, key:"/requests"}, 
        {label: "Resources", icon: <ProfileOutlined />, key:"/resources"},
        {label: "Profile", icon: <UserOutlined/>, key:"profile"},
        {label: "Sign out", icon: <PoweroffOutlined/>, key:"signout", danger:true}]}></Menu>
        </div>
        ) 
    }
    function StudentHome() {
       
        return (   
        <div className="home">
            <Header/>
            <div className="nav-bar">
                <SideMenu/>
                <Content/>
            </div>
        </div>
    )
}

export default StudentHome
