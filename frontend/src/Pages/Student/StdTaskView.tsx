import '../pages.css';
import { Divider } from "antd";

function StdTaskView() {
    return (
        <>
        <div className='content'>
        <div className="top-content">
                <h1>Pending Tasks</h1>
                <p>You have 0 pending tasks.</p>
        </div>
        
        <div className="middle-content">
        <Divider style={{width:"100%"}}/>
            <h1>Completed Tasks</h1>
            <p>You have 0 completed tasks.</p>
        </div>
        </div>
            
        </>
    );
}

export default StdTaskView;