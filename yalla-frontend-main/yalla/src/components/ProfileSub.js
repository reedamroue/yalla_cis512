import { React, useState} from 'react';
import '../assets/Login.css';
import '../assets/Event.css';
import '../assets/Profile.css';
import CalendarPage from './CalendarPage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProfileSub({currUser, isNgo}) {
    const GENERAL = 0;
    const EVENTS = 1; 
    const ANALYTICS = 2;
    const [page, setPage] = useState(GENERAL);

    function goGeneral() {
        setPage(GENERAL);
      }
    
      function goEvents() {
        setPage(EVENTS);
      }
    
      function goAnalytics() {
        setPage(ANALYTICS);
      }

    if (page === GENERAL) {
        return (
            <div>
                <nav class="nav nav-pills nav-justified">
                <a class="nav-item nav-link active" onClick={goGeneral}>General</a>
                <a class="nav-item nav-link" onClick={goEvents}>Events</a>
                <a class="nav-item nav-link" onClick={goAnalytics}>Analytics</a>
                </nav>
                <h3 className='descrip-title'>{isNgo ? "More about this NGO" : "Interests"}</h3>
                <h5>{currUser == null ? "" : isNgo ? currUser.description : currUser.interests}</h5>
            </div>
        )
    }
    if (page === EVENTS) {
        return (
            <div>
                <nav class="nav nav-pills nav-justified">
                <a class="nav-item nav-link" onClick={goGeneral}>General</a>
                <a class="nav-item nav-link active" onClick={goEvents}>Events</a>
                <a class="nav-item nav-link" onClick={goAnalytics}>Analytics</a>
                </nav>
                <CalendarPage currUser={currUser} isNgo={isNgo}/>
            </div>
        )
    }
    if (page === ANALYTICS) {
        return (
            <div>
                <nav class="nav nav-pills nav-justified">
                <a class="nav-item nav-link" onClick={goGeneral}>General</a>
                <a class="nav-item nav-link" onClick={goEvents}>Events</a>
                <a class="nav-item nav-link active" onClick={goAnalytics}>Analytics</a>
                </nav>
                <div>
                    <div className="anaWrapper">
                        <div><h3 className='descrip-title-ana'>Event Goal</h3></div>
                        <div style={{ width: 200, height: 200}}>
                            <CircularProgressbar value={currUser == null ? 0 : currUser.events.length} maxValue={currUser == null ? 0 : currUser.goal} text={`${currUser == null ? 0 : Math.round((currUser.events.length / currUser.goal) * 100)}%`} />
                        </div>
                        <h3 className='subtitle-ana'>You are almost at your event goal!</h3>
                    </div>
                    <div className="anaWrapper">
                        <div><h3 className='descrip-title-ana-com'>Number of Events</h3></div>
                        <h1 class="display-1" className='number-ana'>{currUser == null ? "" : currUser.events.length}</h1>
                        <h3 className='subtitle-ana-com'>Keep going to events to move up a rank!</h3>
                    </div>
                </div>


            </div>
        )
    }
}

export default ProfileSub