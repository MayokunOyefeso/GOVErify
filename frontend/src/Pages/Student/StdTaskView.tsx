import { useEffect, useState } from 'react';
import '../pages.css';
import { Divider } from "antd";
import axios from 'axios';
import StdTaskCard from '../../Components/StdTaskCard';
import { auth } from '../../firebase/firebase';
import { Task } from '../../CustomTypes';
import CompletedTask from '../../Components/CompletedTask';

function StdTaskView() {
    const currUser = auth.currentUser; // Get the logged-in student's email
    const [allTasks, setAllTasks] = useState<Task[]>([]); // All tasks from the main task list
    const [stdTasks, setStdTasks] = useState([]); // Student-specific tasks
    const [pendingTasks, setPendingTasks] = useState<Task[]>([]); // Student's pending tasks
    const [completedTasks, setCompletedTasks] = useState([]); // Student's completed tasks

    useEffect(() => {
        // Fetch all tasks from the main list
        axios.get("http://localhost:4000/tasks")
            .then(response => {
                setAllTasks(response.data);
            })
            .catch(err => console.log("Error fetching all tasks:", err));
    }, []);

    useEffect(() => {
        // Fetch tasks specific to the current student
        
        axios.get(`http://localhost:4000/std_tasks`)
            .then(response => {
                setStdTasks(response.data);
            })
            .catch(err => console.log("Error fetching student tasks:", err));
        
    }, [currUser]);

    useEffect(() => {
        // Filter and cross-check tasks
        if (stdTasks.length > 0) {
            // Exclude tasks from `allTasks` that already exist in `stdTasks`
            const pendingTasks = allTasks.filter(
                task => !stdTasks.some(stdTask => stdTask.title === task.title && stdTask.description === task.description && stdTask.dueDate === task.dueDate)
            );
            setPendingTasks(pendingTasks);
            setCompletedTasks(stdTasks);
        } else {
            // If no `stdTasks`, use `allTasks` as assigned tasks
            setPendingTasks(allTasks);
            setCompletedTasks([]);
        }
    }, [allTasks, stdTasks]);
    return (
        <div className='content'>
            <div className="top-content">
                <h1>Assigned Tasks</h1>
                <p>You have {pendingTasks.length} assigned tasks.</p>
                <br />
                <div className='task-list'>
                    {pendingTasks.map(task => (
                        <div key={task.title}>
                            <StdTaskCard 
                                task={task} 
                                currUserEmail={currUser?.email} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="middle-content-task">
                <Divider style={{ width: "100%" }} />
                <h1>Completed Tasks</h1>
                <p>You have {completedTasks.length} completed tasks.</p>
                <div className='task-list'>
                    {completedTasks.map(task => (
                        <div key={task.id}>
                            <CompletedTask 
                                task={task}  
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StdTaskView;
