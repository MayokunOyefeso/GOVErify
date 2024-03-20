import '../pages.css';
import { Divider } from "antd";

function AdminTaskView() {
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
    )
    
}


export default AdminTaskView
