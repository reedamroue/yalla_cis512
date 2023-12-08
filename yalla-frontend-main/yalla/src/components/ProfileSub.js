import { React, useState} from 'react';
import '../assets/Login.css';
import '../assets/Event.css';
import '../assets/Profile.css';
import CalendarPage from './CalendarPage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProfileSub({currUser, isNgo}) {
    // const GENERAL = 0;
    const EVENTS = 1; 
    const ANALYTICS = 2;
    const [page, setPage] = useState(EVENTS);

    // function goGeneral() {
    //     setPage(GENERAL);
    //   }
    
      function goEvents() {
        setPage(EVENTS);
      }
    
      function goAnalytics() {
        setPage(ANALYTICS);
      }

    // if (page === GENERAL) {
    //     return (
    //         <div>
    //             <nav class="nav nav-pills nav-justified">
    //             {/* <a class="nav-item nav-link active" onClick={goGeneral}>General</a> */}
    //             <a class="nav-item nav-link" onClick={goEvents}>Events</a>
    //             <a class="nav-item nav-link" onClick={goAnalytics}>Analytics</a>
    //             </nav>
    //             <h3 className='descrip-title'>{isNgo ? "More about this NGO" : "Interests"}</h3>
    //             <h5>{currUser == null ? "" : isNgo ? currUser.description : currUser.interests}</h5>
    //         </div>
    //     )
    // }
    if (page === EVENTS) {
        return (
            <div>
                <nav class="nav nav-pills nav-justified">
                {/* <a class="nav-item nav-link" onClick={goGeneral}>General</a> */}
                <a class="nav-item nav-link active" onClick={goEvents}>Events</a>
                <a class="nav-item nav-link" onClick={goAnalytics}>Analytics</a>
                </nav>
                <CalendarPage currUser={currUser} isNgo={isNgo}/>
            </div>
        )
    }
    if (page === ANALYTICS) {
        return (
            <div style={{ textAlign: 'center' }}> {/* Ensures all content within is centered */}
              <nav className="nav nav-pills nav-justified">
                {/* Other nav items */}
                <a className="nav-item nav-link" onClick={goEvents}>Events</a>
                <a className="nav-item nav-link active" onClick={goAnalytics}>Analytics</a>
              </nav>
          
              {/* This is the main container for the pills, set to take the full height of the viewport and center its children */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '20px' }}>
          
                {/* Event Goal Pill */}
                <div className="anaWrapper" style={{ background: 'white', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '30px', margin: '10px auto', width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 className='descrip-title-ana' style={{ margin: '0 0 20px 0' }}>Event Goal</h3>
                  <div style={{ width: 200, height: 200 }}>
                    <CircularProgressbar value={currUser == null ? 0 : currUser.events.length} maxValue={currUser == null ? 0 : currUser.goal} text={`${currUser == null ? 0 : Math.round((currUser.events.length / currUser.goal) * 100)}%`} />
                  </div>
                  <h3 className='subtitle-ana' style={{ marginTop: '20px' }}>You are almost at your event goal!</h3>
                </div>
          
                {/* Number of Events Pill */}
                <div className="anaWrapper" style={{ background: 'white', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '30px', margin: '10px auto', width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 className='descrip-title-ana-com' style={{ margin: '0 0 20px 0' }}>Number of Events</h3>
                  <h1 className="display-1 number-ana" style={{ fontSize: '48px', color: '#E53935', margin: '0' }}>{currUser == null ? "" : currUser.events.length}</h1>
                  <h3 className='subtitle-ana-com' style={{ marginTop: '20px' }}>Keep going to events to move up a rank!</h3>
                </div>
          
              </div>
            </div>
          );
          
    }
}

export default ProfileSub