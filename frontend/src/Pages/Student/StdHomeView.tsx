import '../pages.css';
import snooze from "../../images/snooze.png"

function StdHomeView() {
    
    return (
        <>
            <h1 className='page-title'>Hello&nbsp;Fiskite</h1>
            <div className="centered-box">
                <img src={ snooze } className="snooze" alt="Snooze" />
                <h1>Hooray!!!</h1>
                <p>You have no pending tasks.</p>
            </div>
        </>
    )
    
}

export default StdHomeView