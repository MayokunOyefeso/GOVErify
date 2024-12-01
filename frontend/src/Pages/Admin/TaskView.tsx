import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, DatePicker, Row, Col, Divider } from "antd";
import TaskCard from "../../Components/TaskCard";
const { Option } = Select;

function AdminTaskView() {
    const [form] = Form.useForm();
    const [tasks, setTasks] = useState([]);
    const [taskCompletionData, setTaskCompletionData] = useState({});
    const [expandedTaskId, setExpandedTaskId] = useState(null); // Track the expanded task
    const [options, setOptions] = useState(new Map());

    useEffect(() => {
        axios
            .get("http://localhost:4000/tasks")
            .then(response => {
                const sortedTasks = response.data.sort(
                    (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
                );
                setTasks(sortedTasks);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/user_emails")
            .then(response => {
                const users = response.data;
                const userNames = new Map();
                users.forEach(user => {
                    if (user.role === "student") {
                        userNames.set(user.email, `${user.firstname} ${user.lastname}`);
                    }
                });
                setOptions(userNames);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:4000/std_tasks")
            .then(response => {
                const completionData = response.data.reduce((acc, stdTask) => {
                    const { title, description, isCompleted, email } = stdTask;
                    const taskKey = `${title}_${description}`;
                    if (!acc[taskKey]) {
                        acc[taskKey] = { completed: [], notCompleted: [] };
                    }
                    if (isCompleted) {
                        acc[taskKey].completed.push(email);
                    } else {
                        acc[taskKey].notCompleted.push(email);
                    }
                    return acc;
                }, {});
                setTaskCompletionData(completionData);
            })
            .catch(err => console.log(err));
    }, []);

    // Function to handle expanding and collapsing a task card
    const toggleExpand = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId); // Toggle task expansion
    };

    return (
        <div className="content">
            <div className="top-content">
                <h1>Assigned Tasks</h1>
                <p>You have {tasks.length} assigned tasks.</p>
                <br />
                <div className="task-list">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            completionData={taskCompletionData[`${task.title}_${task.description}`] || { completed: [] }}
                            studentOptions={options}
                            expandedTaskId={expandedTaskId}
                            toggleExpand={toggleExpand}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminTaskView;
