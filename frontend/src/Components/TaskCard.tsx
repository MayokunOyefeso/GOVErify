import { Component } from "react";
import { CalendarOutlined } from "@ant-design/icons/lib/icons";
import { Task } from "../CustomTypes";
import { Divider } from "antd";

function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const monthIndex = dateObject.getMonth();
    const month = months[monthIndex];
    const day = dateObject.getDate();

    return `  ${month} ${day}, ${year}`;
}

function TaskCard ({ task }: { task: Task }) {
    return (
      <div key={task.id} className="task-card">
        <h2 className="task-title">{task.title}</h2>
        <p>{task.description}</p>
        <p><CalendarOutlined />{formatDate(task.dueDate)}</p>
      </div>
    );
}

export default TaskCard;
