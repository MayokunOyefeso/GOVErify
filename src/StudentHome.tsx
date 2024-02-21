import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '../node_modules/@mui/material/index';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/Home';
import no_task from "./images/no_task.png"

import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
  import { Button, Menu } from 'antd';
import { useState } from 'react';
  
  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Home', '1', <HomeIcon style={{fontSize:"2rem" }}/>),
    getItem('Tasks', '2', <TaskAltIcon style={{fontSize:"2rem"}}/>),
    getItem('Requests', '3', <PendingActionsIcon style={{fontSize:"2rem"}}/>),
    getItem('Resources', '4', <DescriptionIcon style={{fontSize:"2rem"}}/>)
  ];
function StudentHome() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    
    return (   
        <div className="std-home">
            <div className="banner">
                <h1 className="side-logo">GOVerify</h1>
                <div className="user-icons">
                <IconButton>
                    <AccountCircleIcon style={{fontSize: "2.5rem", color: "black", marginRight: "20px"}} />
                </IconButton>
                <IconButton >
                    <LogoutIcon style={{fontSize: "2.5rem", color: "black", marginRight: "20px"}} />
                </IconButton>
                </div>
            </div>

            <div className="nav-bar">
                <Button type="primary" onClick={toggleCollapsed} className="nav-button" style={{ marginBottom: 16 }}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu
                className="nav-menu"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
            <img src={no_task} className="no_task" alt="Alarm Snooze" />
        </div>
    )
}

export default StudentHome
