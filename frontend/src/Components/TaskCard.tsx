import { useState } from "react";
import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Divider, List, Modal } from "antd";

function formatDate(dateString) {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
}

function TaskCard({ task, completionData, studentOptions }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const completedStudents = completionData.completed.map(email => studentOptions.get(email) || email);
    const notCompletedStudents = Array.from(studentOptions.keys())
        .filter(email => !completionData.completed.includes(email))
        .map(email => studentOptions.get(email) || email);

    const showModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    return (
        <div className="task-card" >
            <h2 className="task-title">{task.title}</h2>
            <p>{task.description}</p>
            <p><CalendarOutlined /> {formatDate(task.dueDate)}</p>
            <p>Completed: {completedStudents.length}</p>
            <p>Not Completed: {notCompletedStudents.length}</p>
            <Button onClick={showModal}>
                Show Details 
            </Button>
            <Modal
                title={`${task.title} Details`}
                open={isModalVisible}
                onOk={closeModal}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>,
                ]}
            >
                <div style={{ marginTop: "15px" }}>
                    {completedStudents.length > 0 && (
                        <>
                            <Divider />
                            <h3>Completed:</h3>
                            <List
                                dataSource={completedStudents}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </>
                    )}
                    {notCompletedStudents.length > 0 && (
                        <>
                            <Divider />
                            <h3>Not Completed:</h3>
                            <List
                                dataSource={notCompletedStudents}
                                renderItem={item => <List.Item>{item}</List.Item>}
                            />
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default TaskCard;
