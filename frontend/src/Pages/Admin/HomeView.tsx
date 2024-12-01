import '../pages.css';
import axios from 'axios';
import { Divider, Space } from 'antd';
import { Task } from "../../CustomTypes";
import { useState, useEffect } from 'react';
import DashboardCard from '../../Components/DashboardCard';
import { DashboardOutlined, FieldTimeOutlined } from "@ant-design/icons/lib/icons";
import TaskCard from '../../Components/TaskCard';
import { auth } from '../../firebase/firebase';

function AdminHomeView() {
    const currUser = auth.currentUser; // Get the current user from auth
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState([]);
    const [userFullName, setUserFullName] = useState("");

    // Fetch tasks
    useEffect(() => {
        axios.get("http://localhost:4000/tasks")
            .then(response => {
                setTasks(response.data);
            })
            .catch(err => console.log("Error fetching tasks:", err));
    }, []);

    // Fetch users and set the current user's full name
    useEffect(() => {
        if (currUser?.email) {
            axios.get("http://localhost:4000/user_emails")
                .then(response => {
                    setUsers(response.data);
                    const currentUser = response.data.find(user => user.email === currUser.email);
                    if (currentUser) {
                        setUserFullName(`${currentUser.lastname}`);
                    }
                })
                .catch(err => console.log("Error fetching users:", err));
        }
    }, [currUser]);

    return (
        <>
            <div className='content'>
                <div className='dashboard-top-content'>
                    <h1 className='page-title'>Welcome Back, {userFullName}!</h1>
                    <div className="dashboard">
                        <Space direction='horizontal'>
                            <DashboardCard
                                icon={<FieldTimeOutlined style={{ fontSize: 25 }} />}
                                title="Assigned Tasks"
                                value={tasks.length}
                            />
                            <DashboardCard
                                icon={<DashboardOutlined style={{ fontSize: 25 }} />}
                                title="Pending Requests"
                                value={0}
                            />
                        </Space>
                    </div>
                </div>
                <div className="dashboard-middle-content">
                    <Divider style={{ width: "100%" }} />
                    <h1 className='page-title'>Recently Assigned Tasks</h1>
                    <div className='task-list'>
                        {tasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHomeView;
