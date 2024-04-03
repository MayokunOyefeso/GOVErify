import '../pages.css';
import { Space } from 'antd';
import DashboardCard from '../../Components/DashboardCard';
import { DashboardOutlined, FieldTimeOutlined } from "@ant-design/icons/lib/icons";



function AdminHomeView() {
    return (
        <>
            <h1 className='page-title'>Welcome&nbsp;Back!</h1>
            <div className = "dashboard">
            <Space direction='horizontal'>
                <DashboardCard icon={<FieldTimeOutlined style={{fontSize: 25, left: "0px"}}/>} title="Assigned Tasks" value={0} ></DashboardCard>
                <DashboardCard icon={<DashboardOutlined style={{fontSize: 25, left: "0px"}}/>} title="Pending Requests" value={0} ></DashboardCard>
            </Space>
            </div>
            
        </>
    )
    
}

export default AdminHomeView