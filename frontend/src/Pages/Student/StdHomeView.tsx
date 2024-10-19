import '../pages.css';
import snooze from "../../images/snooze.png"
import { useEffect, useState } from 'react';
import { Task } from '../../CustomTypes';
import axios from 'axios';
import { Divider, Space } from 'antd';
import upcoming from "../../images/upcoming.png"
import DashboardCard from '../../Components/DashboardCard';
import { FieldTimeOutlined } from "@ant-design/icons/lib/icons";

function StdHomeView() {
    const [tasks, setTasks] = useState<Task[]>([]); 

    useEffect (() => {
        axios.get("http://localhost:4000/tasks")
        .then(response => {
            setTasks(response.data);
        })
        .catch(err => console.log(err))
    }, [])

    if (!tasks){
        return (
            <>
            <div className='content'>
            <div className='top-content'>
            <h1 className='page-title'>Hello&nbsp;Mayo!</h1>
            <div className="centered-box">
                <img src={ snooze } className="snooze" alt="Snooze" />
                <h1>Hooray!!!</h1>
                <p>You have no pending tasks.</p>
            </div>
            </div>
            <div className='dashboard-middle-content'>
            <Divider style={{width:"100%"}}/>
            <h1 className='page-title'>Upcoming&nbsp;Events</h1>
            <img src={ upcoming } className="event-flyers" alt="Event Flyer" />
            </div>
            
            </div>
            
        </>
        )    
    }

    return (
        <div className='content'>
        <div className='dashboard-top-content'>
        <h1 className='page-title'>Hello Mayo!</h1>
        <div className = "std-dashboard">
        <Space direction='horizontal'>
            <DashboardCard icon={<FieldTimeOutlined style={{fontSize: 25, left: "0px"}}/>} title="Assigned Tasks" value={tasks.length}></DashboardCard>
        </Space>
        </div> 
        </div>
        <div className="dashboard-middle-content">
        <Divider style={{width:"100%"}}/>
        <h1 className='page-title'>Events</h1>
        <img src={ upcoming } className="event-flyers" alt="Event Flyer" />
        </div>
        
        </div>
            
    )
    
}

export default StdHomeView