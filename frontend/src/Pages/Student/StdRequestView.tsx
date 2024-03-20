import '../pages.css';
import { Divider } from "antd";

function StdRequestView() {
    return (
        <>
        <div className='content'>
        <div className="top-content">
            <h1>Pending Requests</h1>
            <p>You have 0 pending requests.</p>
        </div>
        
        <div className="middle-content">
        <Divider style={{width:"100%"}}/>
            <h1>Completed Requests</h1>
            <p>You have 0 completed requests.</p>
        </div>
        </div>
          
        </>
    )
    
}

export default StdRequestView