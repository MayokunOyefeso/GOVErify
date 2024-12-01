import { useState } from 'react';
import { Modal, Button, Form } from 'antd';
import { CalendarOutlined, LinkOutlined } from "@ant-design/icons/lib/icons";
import axios from 'axios';

function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const monthIndex = dateObject.getMonth();
    const month = months[monthIndex];
    const day = dateObject.getDate();

    return `  ${month} ${day}, ${year}`;
}

function StdTaskCard({ task, currUserEmail }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(task.isComplete);

    const axiosPostData = async(postData) => {
        console.log({currUserEmail})
        console.log({postData})
        try {
            await axios.post('http://localhost:4000/std_tasks', postData);
        } catch (error) {
            console.log(error);
        }
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleFormSubmit = (task) => {
        console.log({task})
        const postData = {
            email: currUserEmail,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            isCompleted: true,
        }
        axiosPostData(postData);
        setIsModalVisible(false);
    };

    return (
        <div key={task.title} className="task-card">
            <h2 className='task-title'>{task.title}</h2>
            <p>{task.description}</p>
            {task.url && (
                <p>
                    <LinkOutlined /> <a href={task.url} target="_blank" className='link'>Follow the link here.</a>
                </p>
            )}
            <p><CalendarOutlined />{formatDate(task.dueDate)}</p>
            {!isCompleted && (
                <Button type="primary" onClick={showModal}>
                    Mark as completed
                </Button>
            )}
            {isCompleted && <p>Task completed!</p>}
            <Modal
                title="Confirm Completion"
                open={isModalVisible}
                onOk={() => handleFormSubmit(task)}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to mark this task as completed?</p>
            </Modal>
        </div>
    );
}

export default StdTaskCard;
