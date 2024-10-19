import { useState } from 'react';
import { Modal, Button } from 'antd';
import { Task } from "../CustomTypes";
import { CalendarOutlined, LinkOutlined } from "@ant-design/icons/lib/icons";

function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const monthIndex = dateObject.getMonth();
    const month = months[monthIndex];
    const day = dateObject.getDate();

    return `  ${month} ${day}, ${year}`;
}

function StdTaskCard({ task }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        task.isComplete = true;
        setIsCompleted(true);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div key={task.id} className="task-card">
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
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to mark this task as completed?</p>
            </Modal>
        </div>
    );
}

export default StdTaskCard;
