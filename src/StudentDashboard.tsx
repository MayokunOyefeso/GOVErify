import { Menu } from "antd";
import ProfileView from "./ProfileView";
import StdTaskView from "./StdTaskView";
import StdHomeView from "./StdHomeView";
import ResourceView from "./ResourceView";
import StdRequestView from "./StdRequestView";
import { Route, Routes, useNavigate } from '../node_modules/react-router-dom/dist/index';
import { HomeOutlined, UserOutlined, DashboardOutlined, ProfileOutlined, FieldTimeOutlined , PoweroffOutlined } from "@ant-design/icons/lib/icons";

    
    function Content(){
        return (
            <>
            <Routes>
            <Route path="/student-home" element={<StdHomeView/>}></Route>
            <Route path="/tasks" element={<StdTaskView/>}></Route>
            <Route path="/requests" element={<StdRequestView/>}></Route>
            <Route path="/resources" element={<ResourceView/>}></Route>
            <Route path="/profile" element={<ProfileView/>}></Route>
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

    function SideMenu() {
        const navigate = useNavigate();

        return(
            <div className="side-menu">
            <Menu className="nav-width"
            defaultSelectedKeys={[window.location.pathname]}
        onClick= {({key}) => {
            console.log(key);
            if(key === "signout"){
                
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
    function Dashboard() {
       
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

export default Dashboard
