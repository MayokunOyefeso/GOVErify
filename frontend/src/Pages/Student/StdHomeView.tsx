import '../pages.css';
import snooze from "../../images/snooze.png";
import { useEffect, useState } from 'react';
import { Task } from '../../CustomTypes';
import axios, { all } from 'axios';
import { Divider, Space } from 'antd';
import upcoming from "../../images/upcoming.png";
import DashboardCard from '../../Components/DashboardCard';
import { FieldTimeOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons/lib/icons";
import { auth } from '../../firebase/firebase';

function StdHomeView() {
    const currUser = auth.currentUser; // Get the current user from auth
    const [userLastName, setUserLastName] = useState("Student");
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
    const today = new Date();

    // Fetch tasks
    useEffect(() => {
        axios.get("http://localhost:4000/tasks")
            .then(response => {
                const studentTasks = response.data; // Adjust if filtering by student is required
                setAllTasks(studentTasks)
            })
            .catch(err => console.log("Error fetching tasks:", err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/std_tasks")
            .then(response => {
                const completedTasks = response.data; // Adjust if filtering by student is required
                setCompletedTasks(completedTasks);

                const pendingTasks = allTasks.filter(
                    task => !completedTasks.some(stdTask => stdTask.title === task.title && stdTask.description === task.description && stdTask.dueDate === task.dueDate)
                );
                setPendingTasks(pendingTasks)
            })
            .catch(err => console.log("Error fetching tasks:", err));
    }, [allTasks]);

    useEffect(() => {
        const dueTasks = pendingTasks.filter((task) => {
            const taskDueDate = new Date(task.dueDate); // Convert task.dueDate to a Date object
            return taskDueDate < today; // Compare the dates
        });
        setOverdueTasks(dueTasks)
    }, [pendingTasks]);

    // Fetch user details and set the last name
    useEffect(() => {
        if (currUser?.email) {
            axios.get("http://localhost:4000/user_emails")
                .then(response => {
                    const currentUser = response.data.find(user => user.email === currUser.email);
                    if (currentUser) {
                        setUserLastName(currentUser.firstname);
                    }
                })
                .catch(err => console.log("Error fetching users:", err));
        }
    }, [currUser]);

    return (
        <div className='content'>
            <div className='dashboard-top-content'>
                <h1 className='page-title'>Hello {userLastName}!</h1>
                <div className="std-dashboard">
                    <Space direction='horizontal'>
                        <DashboardCard
                            icon={<FieldTimeOutlined style={{ fontSize: 25 }} />}
                            title="All Tasks"
                            value={allTasks.length}
                        />
                        <DashboardCard
                            icon={<CheckCircleOutlined style={{ fontSize: 25, color: 'green' }} />}
                            title="Completed Tasks"
                            value={completedTasks.length}
                        />
                        <DashboardCard
                            icon={<ExclamationCircleOutlined style={{ fontSize: 25, color: 'red' }} />}
                            title="Overdue Tasks"
                            value={overdueTasks.length}
                        />
                    </Space>
                </div>
            </div>
            <div className='dashboard-middle-content'>
                <Divider style={{ width: "100%" }} />
                {pendingTasks.length > 0 ? (
                    <>
                        <h1 className='page-title'>Your Tasks</h1>
                        <div className='task-list'>
                            {pendingTasks.map(task => (
                                <div key={task.id} className={`task-card ${task.status}`}>
                                    <h3>{task.title}</h3>
                                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="centered-box">
                        <img src={snooze} className="snooze" alt="Snooze" />
                        <h1>Hooray!!!</h1>
                        <p>You have no pending tasks.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StdHomeView;
