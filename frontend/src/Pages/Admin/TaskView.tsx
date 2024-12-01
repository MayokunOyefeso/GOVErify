import '../pages.css';
import { useState, useEffect } from 'react';
import { Divider, Button, Modal, Form, Input, Select, DatePicker, List, Col, Row } from "antd";
import axios from 'axios';
import TaskCard from '../../Components/TaskCard';
import { EmailList, Task } from "../../CustomTypes";
const { Option } = Select;



function AdminTaskView() {
    
    const [form] = Form.useForm();
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [needUpload, setNeedUpload] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [options, setOptions] = useState<Map<string, string>>(new Map());
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

   
    useEffect (() => {
        axios.get("http://localhost:4000/tasks")
        .then(response => {
            setTasks(response.data);
        })
        .catch(err => console.log(err))
    }, [])

    useEffect (() => {
        axios.get("http://localhost:4000/user_emails")
        .then(response => {
            let users: EmailList[] = response.data
            let user_names: Map<string, string> = new Map();
            for (var i=0; i < users.length; i++ ){
                let curr_user = (users[i])
                if (curr_user.role === "student"){
                    user_names.set(curr_user.email,`${curr_user.firstname} ${curr_user.lastname}`)
                }
            }
            setOptions(user_names);
        })
        .catch(err => console.log(err))
    }, [])

    const axiosPostData = async(postData) => {
        try {
            await axios.post('http://localhost:4000/tasks', postData);
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

    const clickUpload = () => {
        setNeedUpload(true);
    }

    const handleSuccessModalOk = () => {
        setIsSuccessModalVisible(false);
    }

    const handleFormSubmit = (values) => {
        const postData = {
            title: values.title,
            description: values.description,
            students: values.students,
            upload: values.requireDocument,
            url: values.link,
            dueDate: values.dueDate,
            isCompleted: false,
        }
        axiosPostData(postData);
        setIsModalVisible(false);
        setIsSuccessModalVisible(true);
        form.resetFields();
    };
    
    if (!tasks){
        return (
            <>
            <div className='content'>
            <div className="top-content">
                    <h1>Assigned Tasks</h1>
                    <p>You have 0 assigned tasks.</p>
            </div>
            
            <div className="middle-content">
            <Divider style={{width:"100%"}}/>
                <h1>Previous Tasks</h1>
                <p>You have 0 previous tasks.</p>
            </div>
            </div>
                
            </>
        );
    }
    return (
        <>
            <div className='content'>
                <div className="top-content">
                    <h1>Assigned Tasks</h1>
                    <p>You have {tasks.length} assigned tasks.</p><br/>
                    <div className='task-list'>
                    {tasks.map(task => (
                    <TaskCard task={task}
                    />
                    ))}
                    </div>
                </div>

                <div className="middle-content-task">
                    <Divider style={{ width: "100%" }} />
                    <h1>Previous Tasks</h1>
                    <p>You have 0 previous tasks.</p>
                </div>
            </div>

            <Button type="primary" onClick={showModal} className='task-form-button'>
                Assign Task
            </Button>

            <Modal
                title="Assign Task"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="assignTaskForm"
                    onFinish={handleFormSubmit}
                    autoComplete="off"
                    className="user-form-modal"
                    layout="vertical" // or "horizontal" for inline labels
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please input the title of the task!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Due Date"
                                name="dueDate"
                                rules={[{ required: true, message: 'Please select the due date!' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Select Students"
                        name="students"
                        rules={[{ required: true, message: 'Please select the students!' }]}
                    >
                        <Select mode="multiple">
                            <Option value="all">All Students</Option>
                            {
                                selectedStudents && selectedStudents[0] !== "all" &&
                                Array.from(options.entries()).sort().map(([key, value]) => (
                                    <Option key={key} value={key}>
                                        {value}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="requireDocument"
                        valuePropName="checked"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: '100%' }}>
                            <label style={{ flex: 1, whiteSpace: 'nowrap', marginRight: -200 }}>Require Document Upload: 
                                <span style={{marginLeft: -325}}><Input type="checkbox" /></span>
                            </label>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Link"
                        name="link"
                        className="user-form"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Assign
                        </Button>
                    </Form.Item>
                </Form>

                
            </Modal>
            <Modal title="Success" open={isSuccessModalVisible} onOk={handleSuccessModalOk} onCancel={handleSuccessModalOk}>
                <p>Form submitted successfully!</p>
            </Modal>
        </>
    );
}

export default AdminTaskView;
