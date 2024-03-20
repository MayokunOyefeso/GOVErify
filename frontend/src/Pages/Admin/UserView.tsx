import '../pages.css';
import { Table, Select, Button, Modal, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function UserView() {
    const [users, setUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            sorter: true,
            key: 'firstname',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname', 
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    useEffect (() => {
        axios.get("http://localhost:4000/user_emails")
        .then(response => {
            let filteredUsers = response.data.map(user => ({ ...user, key: user._id }));
            if (selectedRole !== 'all') {
                filteredUsers = filteredUsers.filter(user => user.role === selectedRole);
            }
            setUsers(filteredUsers);
        })
        .catch(err => console.log(err))
    }, [selectedRole])

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    }

    const showModal = () => {
        
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSuccessModalOk = () => {
        setIsSuccessModalVisible(false);
    }

    const axiosPostData = async(postData) => {
        try {
            await axios.post('http://localhost:4000/user_emails', postData);
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = (values) => {
        const postData = {
            firstname: values.firstname,
            lastname: values.lastname,
            role: values.role,
            email: values.email
        }
        axiosPostData(postData);
        setIsModalVisible(false);
        setIsSuccessModalVisible(true);
        form.resetFields();
    };

    return (
        <div className="users">
            <h2>Users</h2><br/>
            <Select defaultValue="all" style={{ width: 120 }} onChange={handleRoleChange}>
                <Option value="all">All</Option>
                <Option value="student">Students</Option>
                <Option value="admin">Admins</Option>
            </Select>
            
            <div className='users-table'>
                <Table columns={columns} dataSource={users} pagination={false} />
            </div>
            <Button className="user-form-button" onClick={showModal}>
                Add User
            </Button>
            <Modal className='user-form-modal' title="Add Student" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form name="addStudent" form={form} onFinish={onFinish} className='user-form' autoComplete="off"><br/>
                    <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: "First Name is required" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Last Name" rules={[{ required: true, message: "Last Name is required" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: "please enter valid email address" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select role" }]} style={{ width: 200 }}>
                        <Select>
                            <Option value="student">Student</Option>
                            <Option value="admin">Admin</Option>
                        </Select>
                    </Form.Item><br/>
                    <Form.Item>
                        <Button type="primary" className='user-form-submit' htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Success" open={isSuccessModalVisible} onOk={handleSuccessModalOk} onCancel={handleSuccessModalOk}>
                <p>Form submitted successfully!</p>
            </Modal>
        </div>
    );
}

export default UserView;
