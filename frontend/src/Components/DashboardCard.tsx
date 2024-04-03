import { Card, Space, Statistic } from "antd";
import "../Pages/pages.css"
import { ReactNode } from "react";

interface DashboardCardProps {
    icon: ReactNode;
    title: string;
    value: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({icon, title, value }) => {
    return (
        <Card title={<span><br />{icon}&nbsp;&nbsp;&nbsp;{title}<br /></span>} className="custom-card">
            <Space direction="horizontal">
                <Statistic value = {value}></Statistic>
            </Space>
        </Card>
    );
};
export default DashboardCard;