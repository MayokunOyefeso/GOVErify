import '../pages.css';
import axios from 'axios';
import { Divider, Space } from 'antd';
import { Task } from "../../CustomTypes";
import { useState, useEffect } from 'react';
import upcoming from "../../images/upcoming.png"
import DashboardCard from '../../Components/DashboardCard';
import { DashboardOutlined, FieldTimeOutlined } from "@ant-design/icons/lib/icons";



function AdminHomeView() {
    
    const [tasks, setTasks] = useState<Task[]>([]); 

    useEffect (() => {
        axios.get("http://localhost:4000/tasks")
        .then(response => {
            setTasks(response.data);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className='content'>
            <div className='dashboard-top-content'>
            <h1 className='page-title'>Welcome Back, Reyza!</h1>
            <div className = "dashboard">
            <Space direction='horizontal'>
                <DashboardCard icon={<FieldTimeOutlined style={{fontSize: 25, left: "0px"}}/>} title="Assigned Tasks" value={tasks.length}></DashboardCard>
                <DashboardCard icon={<DashboardOutlined style={{fontSize: 25, left: "0px"}}/>} title="Pending Requests" value={0} ></DashboardCard>
            </Space>
            </div> 
            </div>
            <div className="dashboard-middle-content">
            <Divider style={{width:"100%"}}/>
            <h1 className='page-title'>Events</h1>
           
            <img src={ upcoming } className="event-flyers" alt="Event Flyer" />
            </div>
            
            </div>
            
            

            
        </>
    )
    
}

export default AdminHomeView