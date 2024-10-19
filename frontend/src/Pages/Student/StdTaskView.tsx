import { useEffect, useState } from 'react';
import '../pages.css';
import { Divider } from "antd";
import { Task } from '../../CustomTypes';
import axios from 'axios';
import StdTaskCard from '../../Components/StdTaskCard';

function StdTaskView() {
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [stdTask, setStdTask] = useState<Task[]>([]);
    const [pendingTasks, setPendingTask] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    useEffect (() => {
        axios.get("http://localhost:4000/tasks")
        .then(response => {
            setTasks(response.data);
            setStdTask(tasks);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {

    setPendingTask(stdTask.filter(task => !task.isCompleted));
    
    setCompletedTasks(stdTask.filter(task => task.isCompleted))
    }, [tasks, stdTask])
    
    if (!tasks){
        return (
            <>
            <div className='content'>
            <div className="top-content">
                    <h1>Pending Tasks</h1>
                    <p>You have 0 pending tasks.</p>
            </div>
            
            <div className="middle-content">
            <Divider style={{width:"100%"}}/>
                <h1>Completed Tasks</h1>
                <p>You have 0 completed tasks.</p>
            </div>
            </div>
                
            </>
        );
    }
    
   

    return (
        <div className='content'>
            <div className="top-content">
                <h1>Assigned Tasks</h1>
                <p>You have {pendingTasks.length} assigned tasks.</p><br/>
                <div className='task-list'>
                    {pendingTasks.map(task => (
                        <StdTaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>

            <div className="middle-content-task">
                <Divider style={{ width: "100%" }} />
                <h1>Completed Tasks</h1>
                <p>You have {completedTasks.length} completed tasks.</p>
                <div className='task-list'>
                    {completedTasks.map(task => (
                        <StdTaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StdTaskView;
