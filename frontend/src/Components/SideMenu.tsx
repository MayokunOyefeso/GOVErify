import { Menu } from "antd";
import { HomeOutlined, UserOutlined, DashboardOutlined, ProfileOutlined, FieldTimeOutlined , PoweroffOutlined } from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";

function SideMenu({ signout }) {
    const navigate = useNavigate();

    return(
        <div className="side-menu">
            <Menu className="nav-width"
                defaultSelectedKeys={[window.location.pathname]}
                onClick= {({key}) => {
                    console.log(key);
                    if(key === "signout"){
                        signout();
                    } else {
                        navigate(key);
                    }
                }}
                items = {[{label: "Home", icon: <HomeOutlined/>, key:""}, 
                          {label: "Tasks", icon: <FieldTimeOutlined/>, key: "/tasks"}, 
                          {label: "Requests", icon: <DashboardOutlined/>, key:"/requests"}, 
                          {label: "Resources", icon: <ProfileOutlined />, key:"/resources"},
                          {label: "Profile", icon: <UserOutlined/>, key:"/profile"},
                          {label: "Sign out", icon: <PoweroffOutlined/>, key:"signout", danger:true}]}
            ></Menu>
        </div>
    ) 
}

export default SideMenu